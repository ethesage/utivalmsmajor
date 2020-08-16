import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;

/**
 * / @static
 * @description Allows a staff to student
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const addStudentCourse = async (req, res) => {
  const { studentId, courseId } = req.body.student;

  try {
    const student = await models.User.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return errorStat(res, 404, 'Student does not exist');
    }

    const cour = await models.Course.findOne({
      where: { id: courseId },
    });

    if (!student) {
      return errorStat(res, 404, 'Course does not exist');
    }

    const resource = await models.StudentCourse.findOne({
      where: { studentId, courseId },
    });

    if (resource) {
      return errorStat(res, 404, 'Student is Already Taking This Course');
    }

    const studC = await models.StudentCourse.create({
      ...req.body.student,
      isCompleted: false,
      expiresAt: new Date(),
      cohort: cour.cohort,
      status: 'ongoing'
    });

    return successStat(res, 200, 'data', { ...studC.dataValues, message: 'Student added Successfully' });
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllStudentCourse = async (req, res) => {
  const { id } = req.session.user;

  try {
    const resource = await models.StudentCourse.findAll({
      where: { studentId: id },
    });

    if (!resource[0]) {
      return errorStat(res, 404, 'No Course Found');
    }

    return successStat(res, 200, 'data', resource);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getSingleStudentCourse = async (req, res) => {
  const { id } = req.session.user;

  const { studentCourseId } = req.body.student;
  let resource;

  try {
    resource = await models.StudentCourse.findOne({
      where: { id: studentCourseId, studentId: id },
    });

    if (!resource) {
      return errorStat(res, 404, 'Student Course Not Found');
    }

    if (!resource.isCompleted && new Date() > resource.duration) {
      resource.update({
        isCompleted: true,
        status: 'finished'
      });
    }

    return successStat(res, 200, 'data', resource);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getStudentDashboard = async (req, res) => {
  const { id } = req.session.user;

  try {
    const completed = await models.StudentCourse.count({
      where: { studentId: id, status: 'finished' },
    });

    const ongoing = await models.StudentCourse.count({
      where: { studentId: id, status: 'ongoing' },
    });

    const course = await models.StudentCourse.count({
      where: { studentId: id },
    });

    return successStat(res, 200, 'data', { course, ongoing, completed });
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
