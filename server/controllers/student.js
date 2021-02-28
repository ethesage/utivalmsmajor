// import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import sequelize from 'sequelize';
import models from '../database/models';
import helpers from '../helpers';

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
  const { studentId, courseCohortId, amount } = req.body.student;

  try {
    const student = await models.User.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return errorStat(res, 404, 'Student does not exist');
    }

    const cour = await models.CourseCohort.findOne({
      where: { id: courseCohortId },
    });

    if (!cour) {
      return errorStat(res, 404, 'Course does not exist');
    }

    const course = await models.Course.findOne({
      where: { id: cour.courseId },
    });

    const resource = await models.StudentCourse.findOne({
      where: { studentId, courseCohortId },
    });

    if (
      resource &&
      (resource.paymentComplete === true || resource.paymentComplete === null)
    ) {
      return errorStat(res, 404, 'Student is Already Taking This Course');
    }
    let studC;

    console.log(cour);

    if (cour.paymentType === 'split' && !resource) {
      studC = await models.StudentCourse.create({
        ...req.body.student,
        isCompleted: false,
        expiresAt: cour.expiresAt,
        cohortId: cour.cohortId,
        status: 'ongoing',
        courseAmount: course.cost,
        amountPaid: amount,
        paymentComplete: Number(course.cost) === Number(amount),
      });
    } else if (
      cour.paymentType === 'split' &&
      resource &&
      resource.paymentComplete === false
    ) {
      studC = resource.update({
        amountPaid: Number(resource.amountPaid) + Number(amount),
        paymentComplete:
          Number(course.cost) === Number(resource.amountPaid) + Number(amount),
      });
    } else {
      studC = await models.StudentCourse.create({
        ...req.body.student,
        isCompleted: false,
        expiresAt: cour.expiresAt,
        cohortId: cour.cohortId,
        status: 'ongoing',
        paymentComplete: true,
        courseAmount: course.cost,
        amountPaid: amount,
      });
    }

    await cour.update({
      totalStudent: cour.totalStudent + 1,
    });

    return successStat(res, 200, 'data', {
      ...studC.dataValues,
      message: 'Student added Successfully',
    });
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllStudentCourse = async (req, res) => {
  const { id } = req.session.user;

  try {
    const resource = await models.StudentCourse.findAll({
      where: { studentId: id },
      attributes: ['id', 'progress'],
      include: [
        {
          model: models.Cohort,
          attributes: ['cohort', 'id'],
        },
        {
          model: models.Course,
          attributes: ['id', 'name', 'thumbnail'],
        },
        {
          model: models.CourseCohort,
          attributes: ['id', 'cohortId', 'dateRange', 'courseId'],
        },
      ],
    });

    if (!resource[0]) {
      return successStat(res, 200, 'data', []);
    }

    return successStat(res, 200, 'data', resource);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getSingleStudentCourse = async (req, res) => {
  const { id } = req.session.user;

  const { courseCohortId } = req.body.student;

  // const isSort = (array) => {
  //   const sort = array.sort((a, b) => {
  //     // console.log(a.dataValues.CohortClassDays[0].dataValues.date);
  //     const c = new Date(a.dataValues.CohortClassDays[0].dataValues.date);
  //     const d = new Date(b.dataValues.CohortClassDays[0].dataValues.date);
  //     return c - d;
  //   });
  //   return sort;
  // };

  const resource = await models.StudentCourse.findOne({
    where: { courseCohortId, studentId: id },
    include: [
      {
        model: models.Cohort,
      },
      {
        model: models.Course,
        attributes: ['id', 'name', 'description', 'thumbnail', 'list_desc'],
        include: [
          {
            model: models.CourseDescription,
          },
          {
            model: models.Classes,
            required: false,
            include: [
              {
                model: models.CohortTrainer,
                where: { courseCohortId },
                attributes: ['id', 'userId'],
                required: false,
                include: {
                  model: models.User,
                  attributes: [
                    'firstName',
                    'lastName',
                    'profilePic',
                    'occupation',
                    'bio',
                  ],
                },
              },
              {
                model: models.ClassResources,
              },
              {
                model: models.CohortClassVideo,
                attributes: ['id', 'link'],
                where: { courseCohortId },
                required: false,
              },
              {
                model: models.CohortClassDays,
                where: { courseCohortId },
                required: false,
              },
            ],
          },
        ],
      },
      {
        model: models.CourseCohort,
      },
    ],

    order: [
      [models.Course, models.Classes, models.CohortClassDays, 'date', 'ASC'],
    ],
  });

  if (!resource) {
    return errorStat(res, 404, 'Student Course Not Found');
  }

  if (!resource.isCompleted && new Date() > resource.duration) {
    resource.update({
      isCompleted: true,
      status: 'finished',
    });
  }

  // isSort(resource.Course.Classes);
  // console.log(resource.Course.Classes);

  if (
    resource.CourseCohort.dataValues.paymentType === 'split' &&
    resource.paymentComplete === false
  ) {
    const half = Math.ceil(resource.Course.Classes.length / 2);
    resource.Course.Classes = resource.Course.Classes.splice(0, half);
  }

  // console.log(resource.Course.Classes.length, resource.paymentComplete);
  return successStat(res, 200, 'data', resource);
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
            'id',
            'firstName',
            'lastName',
            'linkedin',
            'profilePic',
            'occupation',
            'email',
            'phoneNumber',
            'company',
            'occupation',
          ],
        },
      ],
      attributes: ['courseCohortId'],
    });

    return successStat(res, 200, 'data', courseStudent);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getStudentNextClass = async (req, res) => {
  const { id } = req.session.user;

  const isSort = (array, argument, check) => {
    const sort = array.sort((a, b) => {
      // console.log(a.dataValues.CohortClassDays[0].dataValues.date);
      const c = new Date(
        check ? a[argument] : a.dataValues.CohortClassDays[0].dataValues.date
      );
      const d = new Date(
        check ? b[argument] : b.dataValues.CohortClassDays[0].dataValues.date
      );
      return c - d;
    });
    return sort;
  };

  const getClasses = await models.StudentCourse.findAll({
    where: { studentId: id, isCompleted: false, status: 'ongoing' },
    attributes: ['studentId', 'paymentComplete', 'courseCohortId'],
    include: [
      {
        model: models.Course,
        attributes: ['thumbnail', 'name', 'extLink'],

        include: [
          {
            model: models.Classes,
            attributes: ['link'],
            include: [
              {
                model: models.CohortClassDays,
                where: { date: { [Op.gte]: new Date() } },
                attributes: ['date', 'time'],
                order: [['date', 'createdAt', 'ASC']],
              },
            ],
          },
        ],
      },
      {
        model: models.CourseCohort,
        attributes: ['courseId', 'id'],
      },
    ],
    // order: [[models.CohortClassDays, 'date', 'ASC']]
  });

  isSort(
    getClasses[0].dataValues.Course.Classes,
    'dataValues.CohortClassDays.date'
  );

  const getAll = getClasses.reduce((acc, item, index) => {
    const n_item = item.dataValues;

    if (n_item && n_item.Course.Classes[0]) {
      const course = item.dataValues.Course.dataValues;
      const link = {
        link: item.dataValues.Course.Classes[0].dataValues.link,
      };
      const classDays =
        item.dataValues.Course.Classes[0].dataValues.CohortClassDays[0]
          .dataValues;
      const all = { ...course, ...link, ...classDays };
      acc[index] = all;
    }
    return acc;
  }, []);

  if (getClasses[0].paymentComplete === false) {
    const getAllClass = await models.Classes.findAll({
      where: { courseCohortId: getClasses[0].dataValues.courseCohortId },
      // required: false,
      include: [
        {
          model: models.CohortClassDays,
          attributes: ['date', 'time'],
          required: false,
          order: [['date', 'createdAt', 'ASC']],
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    const alll = getAllClass.reduce((acc, item, index) => {
      const n_item = item.dataValues;
      if (n_item && item.dataValues.CohortClassDays[0]) {
        const link = {
          link: item.dataValues.link,
          title: item.dataValues.title,
        };
        const classDays = item.dataValues.CohortClassDays[0].dataValues;
        const all = { ...link, ...classDays };
        acc[index] = all;
      }
      return acc;
    }, []);

    const sorted = isSort(alll, 'date', true);

    const half = Math.ceil(sorted.length / 2);
    sorted.splice(0, half);

    const val = sorted.find((date) => `${date.date}` === `${getAll[0].date}`);

    // console.log(getClasses);

    if (val) getAll[0].link = '';
  }

  return successStat(res, 200, 'data', getAll);
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

    if (!checkStudent) return errorStat(res, 400, 'Not Allowed');

    const getClassDays = await models.Classes.findAll({
      where: { courseCohortId },
      attributes: ['title'],
      include: [
        {
          model: models.CohortClassDays,
          attributes: ['date', 'time'],
        },
      ],
    });

    if (!getClassDays[0]) return errorStat(res, 400, 'No Available Class Day');

    const getAll = getClassDays.reduce((acc, item, index) => {
      if (item.CohortClassDays[0]) {
        // console.log(item, "===> item");
        const all = {
          title: item.dataValues.title,
          ...item.CohortClassDays[0].dataValues,
        };

        acc[index] = all;
      }
      return acc;
    }, []);

    return successStat(res, 200, 'data', getAll);
  } catch (e) {
    // console.log(e);
    errorStat(res, 500, 'Operation Failed Please Try Again');
  }
};

export const addStudentProgress = async (req, res) => {
  const { courseCohortId, classId } = req.body.student;

  const { id } = req.session.user;

  try {
    const checkStudent = await models.StudentCourse.findOne({
      where: { studentId: id, courseCohortId },
    });

    if (!checkStudent) return errorStat(res, 200, 'Not Allowed');

    const checkClass = await models.Classes.findOne({
      where: { id: classId, started: true },
    });

    if (!checkClass) return errorStat(res, 200, 'Not Started');

    const findclassProgress = await models.CourseProgress.findAll({
      where: { userId: id, classId, type: 'student' },
    });

    // console.log(findclassProgress)

    if (!findclassProgress[0]) {
      await models.CourseProgress.create({
        courseCohortId,
        userId: id,
        classId,
        type: 'student',
      });

      const find = await models.CourseProgress.findAll({
        where: { userId: id, courseCohortId, type: 'student' },
      });

      const count = await models.Classes.findAll({
        where: { courseCohortId },
      });

      await checkStudent.update({
        progress: Math.floor((find.length / count.length) * 100),
      });
    }

    return successStat(res, 200, 'data', 'update successful');
  } catch (e) {
    errorStat(res, 500, 'Operation Failed Please Try Again');
  }
};
