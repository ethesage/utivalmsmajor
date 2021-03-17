/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
// import sequelize from 'sequelize';
// import { try } from "bluebird";
import models from '../database/models';
import helpers from '../helpers';

const { successStat, errorStat } = helpers;

// const { Op, fn, col } = sequelize;

/**
 * / @static
 * @description Allows a staff to student
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof adminCOntroller
 */

export const getAdminDashboard = async (req, res) => {
  const { year } = req.query;
  const student = await models.sequelize.query(
    `select count(distinct "Users"."id") as students from "Users"  join "StudentCourses" sc on sc."studentId" = "Users"."id" where "role" = 'student';`
  );

  const course = await models.Course.count();

  const trainer = await models.sequelize.query(
    `select count(distinct "Users"."id") as trainers from "Users"  join "CohortTrainers" ct on ct."userId" = "Users"."id" where "role" = 'trainer';`
  );

  const admins = await models.User.count({ where: { role: 'admin' } });

  const studentByCourse = await models.sequelize.query(
    `SELECT "Courses"."name", COUNT("studentId") AS 
        value FROM "Courses" LEFT JOIN "StudentCourses" ON "Courses"."id" = "StudentCourses"."courseId" 
        WHERE "Courses"."id" IS NOT NULL GROUP BY "Courses"."id"`
  );

  const trainerByCourse = await models.sequelize.query(
    `select name, count(distinct "userId") as value from "CohortTrainers" t join "CourseCohorts" cc on t."courseCohortId" = cc.id join "Courses" c on cc."courseId" = c.id group by cc."courseId", c.name`
  );

  const date = await models.sequelize.query(
    `SELECT EXTRACT(YEAR FROM "createdAt") AS YEAR, to_char("createdAt", 'Mon') AS MONTH,
    COUNT(*) AS COUNT FROM "StudentCourses"
    where EXTRACT(YEAR FROM "createdAt") = '${
      year || new Date().getUTCFullYear()
    }'
    GROUP BY "StudentCourses"."createdAt", EXTRACT(MONTH FROM "createdAt")`
  );

  const getAll = date[0].reduce((acc, item) => {
    if (item) {
      acc[item.month] = acc[item.month]
        ? acc[item.month] + Number(item.count)
        : Number(item.count);
    }
    return acc;
  }, {});

  return successStat(res, 200, 'data', {
    student: Number(student[0][0].students),
    course,
    trainer: Number(trainer[0][0].trainers),
    admins,
    studentByCourse: studentByCourse[0],
    trainerByCourse: trainerByCourse[0],
    studentByMonth: getAll,
  });
};

/**
 * / @static
 * @description returns all courses
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing courses and their total courses cohorts.
 * @memberof adminCOntroller
 */

export const getAllCourses = async (req, res) => {
  const courses = await models.Course.findAll({
    include: {
      model: models.CourseCohort,
      attributes: ['id'],
    },

    group: ['Course.id', 'CourseCohorts.id'],
  });

  return successStat(res, 200, 'data', courses);
};

export const getAllCourseCohorts = async (req, res) => {
  const { id } = req.body.admin;

  const resource = await models.CourseCohort.findAll({
    where: { courseId: id },
    attributes: [
      'id',
      'cohortId',
      'dateRange',
      'totalStudent',
      'courseId',
      'folderId',
      'paymentType',
    ],
    include: [
      {
        model: models.Cohort,
        attributes: ['cohort', 'id'],
      },
      {
        model: models.Course,
        include: {
          model: models.Classes,
          attributes: ['id'],
        },
      },
      {
        model: models.CohortTrainer,
        attributes: ['userId'],
      },
    ],
  });

  if (!resource[0]) {
    return successStat(res, 200, 'data', []);
  }

  return successStat(res, 200, 'data', resource);
};

export const getCourseCohort = async (req, res) => {
  const { id } = req.body.admin;

  const resource = await models.CourseCohort.findOne({
    where: { id },
    attributes: ['id', 'expiresAt', 'dateRange', 'folderId', 'paymentType'],
    include: [
      {
        model: models.Cohort,
        attributes: ['id', 'cohort'],
      },
      {
        model: models.Course,
        attributes: [
          'id',
          'name',
          'description',
          'duration',
          'thumbnail',
          'list_desc',
        ],
        include: [
          {
            model: models.CourseDescription,
            attributes: ['id', 'title', 'description'],
          },
          {
            model: models.Classes,
            attributes: ['id', 'title', 'description', 'link'],
            include: [
              // {
              //   model: models.ClassResources,
              // },
              {
                model: models.CohortClassDays,
                where: { courseCohortId: id },
                required: false,
              },
              {
                model: models.CohortClassVideo,
                attributes: ['id', 'link'],
                where: { courseCohortId: id },
                required: false,
              },
              {
                model: models.CohortTrainer,
                where: { courseCohortId: id },
                attributes: ['id', 'userId'],
                required: false,
                include: {
                  model: models.User,
                  attributes: [
                    'firstName',
                    'lastName',
                    'profilePic',
                    'occupation',
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
    order: [
      [models.Course, models.Classes, models.CohortClassDays, 'date', 'ASC'],
    ],
  });

  if (!resource) {
    return errorStat(res, 404, 'Course not found');
  }

  return successStat(res, 200, 'data', resource);
};

export const getCourse = async (req, res) => {
  const { id } = req.body.admin;

  const course = await models.Course.findOne({
    where: {
      id,
    },
  });

  return successStat(res, 200, 'data', course);
};

export const addpreviousVideo = async (req, res) => {
  const prevVideo = await models.CohortClassVideo.create(
    {
      ...req.body,
    },
    { returning: ['id', 'link'] }
  );

  return successStat(res, 200, 'data', prevVideo);
};

export const removepreviousVideo = async (req, res) => {
  const { id } = req.params;

  await models.CohortClassVideo.destroy({
    where: { id },
  });

  return successStat(res, 200, 'message', 'deleted');
};

export const getCourseCatnames = async (req, res) => {
  const categories = await models.codeDesc.findAll({
    where: {
      seq: 1,
    },
    attributes: ['code', 'desc'],
  });

  const levels = await models.codeDesc.findAll({
    where: {
      seq: 2,
    },
    attributes: ['code', 'desc'],
  });

  const coursecats = categories.map((cat) => ({
    name: cat.code,
    value: cat.desc,
  }));

  const courseLevels = levels.map((cat) => ({
    name: cat.code,
    value: cat.desc,
  }));

  return successStat(res, 200, 'data', {
    categories: coursecats,
    levels: courseLevels,
  });
};

export const getAllTrainers = async (req, res) => {
  const { role } = req.params;

  const trainers = await models.User.findAll({
    where: {
      role,
    },
    attributes: [
      'id',
      'email',
      'firstName',
      'lastName',
      'occupation',
      'region',
      'status',
      'role',
      'profilePic',
    ],
  });

  return successStat(res, 200, 'data', trainers);
};

export const deleteStudent = async (req, res) => {
  const { courseCohortId, studentId } = req.body.admin;

  const { role } = req.session.user;

  if (role === 'admin') {
    const isStudent = await models.StudentCourse.findOne({
      where: { courseCohortId, studentId },
    });

    if (!isStudent) {
      return errorStat(res, 404, 'student not enrolled in this course cohort');
    }

    await isStudent.destroy();

    successStat(res, 200, 'data', 'Student Successfully Deleted');
  } else {
    errorStat(res, 404, 'you are not permitted to perform this operation');
  }
};
