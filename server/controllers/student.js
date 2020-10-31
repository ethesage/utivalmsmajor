import sequelize from "sequelize";
import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;

const { Op } = sequelize;

/**
 * / @static
 * @description Allows a staff to student
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const addStudentCourse = async (req, res) => {
  const { studentId, courseCohortId } = req.body.student;

  try {
    const student = await models.User.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return errorStat(res, 404, "Student does not exist");
    }

    const cour = await models.CourseCohort.findOne({
      where: { id: courseCohortId },
    });

    if (!student) {
      return errorStat(res, 404, "Course does not exist");
    }

    const resource = await models.StudentCourse.findOne({
      where: { studentId, courseCohortId },
    });

    if (resource) {
      return errorStat(res, 404, "Student is Already Taking This Course");
    }

    const studC = await models.StudentCourse.create({
      ...req.body.student,
      isCompleted: false,
      expiresAt: cour.expiresAt,
      cohortId: cour.cohortId,
      status: "ongoing",
    });

    await cour.update({
      totalStudent: cour.totalStudent + 1,
    });

    return successStat(res, 200, "data", {
      ...studC.dataValues,
      message: "Student added Successfully",
    });
  } catch (e) {
    errorStat(res, 500, "Operation Failed, Please Try Again");
  }
};

export const getAllStudentCourse = async (req, res) => {
  const { id } = req.session.user;

  try {
    const resource = await models.StudentCourse.findAll({
      where: { studentId: id },
      include: [
        {
          model: models.Cohort,
        },
        {
          model: models.Course,
          include: [
            {
              model: models.CourseDescription,
            },
            {
              model: models.CourseProgress,
              where: { userId: id },
            },
          ],
        },
        {
          model: models.CourseCohort,
          include: [
            {
              model: models.Classes,
              include: [
                {
                  model: models.Trainer,
                  include: {
                    model: models.User,
                    attributes: [
                      "firstName",
                      "lastName",
                      "profilePic",
                      "occupation",
                      "bio",
                    ],
                  },
                },
                {
                  model: models.ClassResources,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!resource[0]) {
      return successStat(res, 200, "data", []);
    }

    return successStat(res, 200, "data", resource);
  } catch (e) {
    errorStat(res, 500, "Operation Failed, Please Try Again");
  }
};

export const getSingleStudentCourse = async (req, res) => {
  const { id } = req.session.user;

  const { courseCohortId } = req.body.student;
  let resource;

  try {
    resource = await models.StudentCourse.findOne({
      where: { courseCohortId, studentId: id },
      include: [
        {
          model: models.Cohort,
        },
        {
          model: models.Course,
          include: [
            {
              model: models.CourseDescription,
            },
            {
              model: models.CourseProgress,
              where: { userId: id },
            },
          ],
        },
        {
          model: models.CourseCohort,
          include: [
            {
              model: models.Classes,
              include: [
                {
                  model: models.Trainer,
                  include: {
                    model: models.User,
                    attributes: [
                      "firstName",
                      "lastName",
                      "profilePic",
                      "occupation",
                      "bio",
                    ],
                  },
                },
                {
                  model: models.ClassResources,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!resource) {
      return errorStat(res, 404, "Student Course Not Found");
    }

    if (!resource.isCompleted && new Date() > resource.duration) {
      resource.update({
        isCompleted: true,
        status: "finished",
      });
    }

    return successStat(res, 200, "data", resource);
  } catch (e) {
    errorStat(res, 500, "Operation Failed, Please Try Again");
  }
};

export const getStudentDashboard = async (req, res) => {
  const { id } = req.session.user;

  try {
    const completed = await models.StudentCourse.count({
      where: { studentId: id, status: "finished" },
    });

    const ongoing = await models.StudentCourse.count({
      where: { studentId: id, status: "ongoing" },
    });

    const course = await models.StudentCourse.count({
      where: { studentId: id },
    });

    return successStat(res, 200, "data", { course, ongoing, completed });
  } catch (e) {
    errorStat(res, 500, "Operation Failed, Please Try Again");
  }
};

export const allCourseStudents = async (req, res) => {
  const { courseCohortId } = req.body.student;
  //  const { id } = req.session.user;
  // const { courseCohortId } = await models.StudentCourse.findOne({
  //   where: { id: studentCourseId },
  // });

  try {
    const courseStudent = await models.StudentCourse.findAll({
      where: { courseCohortId },
      include: [
        {
          model: models.User,
          attributes: [
            "firstName",
            "lastName",
            "linkedin",
            "profilePic",
            "occupation",
          ],
        },
      ],
      attributes: ["courseCohortId"],
    });

    return successStat(res, 200, "data", courseStudent);
  } catch (e) {
    errorStat(res, 500, "Operation Failed, Please Try Again");
  }
};

export const getStudentNextClass = async (req, res) => {
  const { id } = req.session.user;

  try {
    const getClasses = await models.StudentCourse.findAll({
      where: { studentId: id, isCompleted: false, status: "ongoing" },
      attributes: ["studentId"],
      include: [
        {
          model: models.Course,
          attributes: ["thumbnail", "name", "extLink"],
        },
        {
          model: models.CourseCohort,
          attributes: ["courseId"],
          include: [
            {
              model: models.Classes,
              attributes: ["link"],
              include: [
                {
                  model: models.ClassDays,
                  where: { date: { [Op.gte]: new Date() } },
                  attributes: ["date", "time"],
                },
              ],
            },
          ],
        },
      ],
    });

    // if (!getClasses[0]) return errorStat(res, 400, 'No Available Class');

    const getAll = getClasses.reduce((acc, item, index) => {
      if (item.dataValues) {
        const course = item.dataValues.Course.dataValues;
        const link = {
          link: item.dataValues.CourseCohort.Classes[0].dataValues.link,
        };
        const classDays =
          item.dataValues.CourseCohort.Classes[0].dataValues.ClassDays[0]
            .dataValues;
        const all = { ...course, ...link, ...classDays };
        acc[index] = all;
      }
      return acc;
    }, []);

    return successStat(res, 200, "data", getAll);
  } catch (e) {
    errorStat(res, 500, "Operation Failed Please Try Again");
  }
};

export const getStudentClassDays = async (req, res) => {
  const { courseCohortId } = req.body.student;

  // const { courseCohortId } = await models.StudentCourse.findOne({
  //   where: { id: studentCourseId },
  // });

  const { id } = req.session.user;

  try {
    const checkStudent = await models.StudentCourse.findAll({
      where: { studentId: id, courseCohortId },
    });

    if (!checkStudent) return errorStat(res, 400, "Not Allowed");

    const getClassDays = await models.Classes.findAll({
      where: { courseCohortId },
      attributes: ["title"],
      include: [
        {
          model: models.ClassDays,
          attributes: ["date", "time"],
        },
      ],
    });

    if (!getClassDays[0]) return errorStat(res, 400, "No Available Class Day");

    const getAll = getClassDays.reduce((acc, item, index) => {
      if (item.ClassDays[0]) {
        // console.log(item, "===> item");
        const all = {
          title: item.dataValues.title,
          ...item.ClassDays[0].dataValues,
        };

        acc[index] = all;
      }
      return acc;
    }, []);

    return successStat(res, 200, "data", getAll);
  } catch (e) {
    // console.log(e);
    errorStat(res, 500, "Operation Failed Please Try Again");
  }
};
