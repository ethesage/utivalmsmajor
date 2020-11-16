/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
import { paginate, calculateLimitAndOffset } from 'paginate-info';
import models from '../database/models';
import helpers from '../helpers';
// import { createCourse } from "../middlewares/validators/schemas/course";
// import  from "../helpers"

const { successStat, errorStat } = helpers;

// const { Op } = sequelize;

/**
 * / @static
 * @description Allows a staff to create a course
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const cohort = async (req, res) => {
  try {
    const isCohort = await models.Cohort.findOne({
      where: { ...req.body.cohort },
    });

    console.log(isCohort);

    if (isCohort) return errorStat(res, 404, 'Cohort already exist');

    const createCohort = await models.Cohort.create({
      ...req.body.cohort,
      status: 'ongoing',
      totalCourse: 0,
    });

    return successStat(res, 201, 'data', createCohort);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const addCohortCourse = async (req, res) => {
  const { courseId } = req.body.cohort;

  // const { id } = req.session.user;

  const course = await models.Course.findOne({
    where: { id: courseId },
  });

  if (!course) return errorStat(res, 404, 'Course does not exist');

  let cohortGet = await models.Cohort.findOne({
    where: { cohort: req.body.cohort.cohort },
  });

  if (!cohortGet) {
    cohortGet = await models.Cohort.create({
      cohort: req.body.cohort.cohort,
    });
  }

  const courseCohort = await models.CourseCohort.findOne({
    where: { courseId, cohortId: cohortGet.id },
  });

  if (courseCohort) {
    return errorStat(res, 404, 'Course already exist in this cohort');
  }

  const createdCohort = await models.CourseCohort.create({
    ...req.body.cohort,
    status: 'ongoing',
    totalStudent: 0,
    cohortId: cohortGet.id,
  });

  await cohortGet.update({
    totalCourse: cohortGet.totalCourse + 1,
  });

  const course_cohort = await models.CourseCohort.findOne({
    where: {
      id: createdCohort.id,
    },
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
        ],
      },
      {
        model: models.Classes,
        include: [
          {
            model: models.Trainer,
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
        ],
      },
    ],
  });

  return successStat(res, 201, 'data', course_cohort);
};

export const getCohort = async (req, res) => {
  const { cohortId } = req.body.cohort;

  //   const { id } = req.session.user;

  try {
    const cohortGet = await models.Cohort.findOne({
      where: { id: cohortId },
      include: [
        {
          model: models.Course,
        },
      ],
    });

    if (!cohortGet) return errorStat(res, 404, 'Cohort does not exist');

    return successStat(res, 201, 'data', cohortGet);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllCohort = async (req, res) => {
  const { pageLimit, currentPage } = req.body.cohort;
  const { offset, limit } = calculateLimitAndOffset(currentPage, pageLimit);

  const sqlQueryMap = {
    offset,
    limit,
  };

  try {
    const { rows, count } = await models.Cohort.findAndCountAll({
      ...sqlQueryMap,
      include: [
        {
          model: models.CourseCohort,
        },
      ],
    });

    if (!rows[0]) return errorStat(res, 404, 'Cohort does not exist');

    const paginationMeta = paginate(currentPage, count, rows, pageLimit);

    return successStat(res, 200, 'data', { paginationMeta, rows });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateCohort = async (req, res) => {
  const { cohortId } = req.body.cohort;

  try {
    const cohortGet = await models.Cohort.findOne({
      where: { id: cohortId },
      // include: [
      //   {
      //     model: models.Course
      //   }
      // ]
    });

    if (!cohortGet) return errorStat(res, 404, 'Cohort does not exist');

    await cohortGet.update({
      ...req.body.cohort,
    });

    return successStat(res, 201, 'data', cohortGet);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateCourseCohort = async (req, res) => {
  const { courseCohortId } = req.body.cohort;

  try {
    const cohortGet = await models.CourseCohort.findOne({
      where: { id: courseCohortId },
      // include: [
      //   {
      //     model: models.Course
      //   }
      // ]
    });

    if (!cohortGet) return errorStat(res, 404, 'Cohort does not exist');

    await cohortGet.update({
      ...req.body.cohort,
    });

    return successStat(res, 201, 'data', cohortGet);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const deleteCohort = async (req, res) => {
  const { cohortId } = req.body.course;

  try {
    const cohortGet = await models.cohort.findOne({
      where: { id: cohortId },
      include: [
        {
          model: models.Cohort,
        },
      ],
    });

    if (!cohortGet) {
      return errorStat(res, 404, 'cohort not found');
    }

    await cohortGet.destroy();

    return successStat(res, 200, 'data', 'Delete Successful');
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const deleteCourseCohort = async (req, res) => {
  const { courseCohortId } = req.body.course;

  try {
    const cohortGet = await models.CourseCohort.findOne({
      where: { id: courseCohortId },
      include: [
        // {
        //   model: models.Cohort,
        // }
      ],
    });

    if (!cohortGet) {
      return errorStat(res, 404, 'cohort not found');
    }

    await cohortGet.destroy();

    return successStat(res, 200, 'data', 'Delete Successful');
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
