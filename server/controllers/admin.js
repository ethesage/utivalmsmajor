/* eslint-disable import/prefer-default-export */
// import sequelize from 'sequelize';
import models, { sequelize } from '../database/models';
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
  try {
    const student = await models.StudentCourse.count();

    const course = await models.Course.count();

    const trainer = await models.Trainer.count();

    const studentByCourse = await models.sequelize.query(
      `SELECT "Courses"."name", COUNT("studentId") AS 
        value FROM "Courses" LEFT JOIN "StudentCourses" ON "Courses"."id" = "StudentCourses"."courseId" 
        WHERE "Courses"."id" IS NOT NULL GROUP BY "Courses"."id"`
    );
    const trainerByCourse = await models.sequelize.query(
      `SELECT "Courses"."name", COUNT("courseId") AS 
        value FROM "Courses" LEFT JOIN "Trainers" ON "Courses"."id" = "Trainers"."courseId" 
        WHERE "Courses"."id" IS NOT NULL GROUP BY "Courses"."id"`
    );

    const date = await models.sequelize.query(
      `SELECT EXTRACT(YEAR FROM "createdAt") AS YEAR, to_char("createdAt", 'Mon') AS MONTH, COUNT(*) AS COUNT FROM "StudentCourses" GROUP BY "StudentCourses"."createdAt", EXTRACT(MONTH FROM "createdAt")`
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
      student,
      course,
      trainer,
      studentByCourse: studentByCourse[0],
      trainerByCourse: trainerByCourse[0],
      studentByMonth: getAll,
    });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
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
    ],
    include: [
      {
        model: models.Cohort,
        attributes: ['cohort', 'id'],
      },
      {
        model: models.Classes,
        attributes: ['id'],
        include: [
          {
            model: models.Trainer,
            attributes: ['userId'],
          },
        ],
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
    attributes: ['id', 'expiresAt', 'dateRange', 'folderId'],
    include: [
      {
        model: models.Cohort,
        attributes: ['id', 'cohort'],
      },
      {
        model: models.Course,
        attributes: ['id', 'name', 'description', 'duration', 'thumbnail'],
        include: [
          {
            model: models.CourseDescription,
            attributes: ['id', 'title', 'description'],
          },
        ],
      },
      {
        model: models.Classes,
        attributes: ['id', 'title', 'description', 'link'],
        include: [
          {
            model: models.Trainer,
            attributes: ['id', 'userId'],
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
          {
            model: models.ClassResources,
          },
        ],
      },
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
