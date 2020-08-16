/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
// import { paginate, calculateLimitAndOffset } from 'paginate-info';
import models from "../database/models";
import helpers from "../helpers";
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

export const createClass = async (req, res) => {
  const { resourceLink, courseId, trainerId, courseCohortId } = req.body.class;

  try {
    const course = await models.Course.findOne({
      where: { id: courseId }
    });

    if (!course) return errorStat(res, 404, 'Course does not exist');

    const courseCohort = await models.Cohort.findOne({
      where: { id: courseCohortId }
    });

    if (!courseCohort) return errorStat(res, 404, 'Course Cohort does not exist');

    const trainer = await models.User.findOne({
      where: { id: trainerId }
    });

    if (!trainer) return errorStat(res, 404, 'Trainer does not exist');

    const classCreate = await models.Classes.create({
      ...req.body.class,
    });

    const resource = await models.ClassResouces.create({
      ...req.body.class,
      link: resourceLink,
      classId: classCreate.id
    }
    );

    const day = await models.ClassDays.create({
      ...req.body.class,
      classId: classCreate.id,
      time: '16:17:03.084+01:00'
    }
    );

    return successStat(res, 201, 'data', { classCreate, classResource: resource, classDays: day });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getClass = async (req, res) => {
  const { classId } = req.body.class;

  try {
    const allClass = await models.Class.findOne({
      where: { classId },
      include: [
        {
          model: models.CourseDays
        },
        {
          model: models.CourseResourse
        }
      ]
    });

    if (!allClass) return errorStat(res, 404, 'Class Not Found');

    return successStat(res, 201, 'data', allClass);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllClass = async (req, res) => {
  const { courseId } = req.body.class;

  try {
    const allClass = await models.Class.findAll({
      where: { courseId },
      include: [
        {
          model: models.CourseDays
        },
        {
          model: models.CourseResourse
        }
      ]
    });

    if (!allClass[0]) return errorStat(res, 404, 'No class Found for this course');

    return successStat(res, 201, 'data', allClass);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateClass = async (req, res) => {
  const { classId } = req.body.course;

  try {
    const foundClass = await models.Class.findOne({
      where: { classId },
      include: [
        {
          model: models.CourseDays
        },
        {
          model: models.CourseResourse
        }
      ]
    });

    return successStat(res, 201, 'data', foundClass);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const deleteClass = async (req, res) => {
  const { classId } = req.body.course;

  try {
    const foundClass = await models.Class.findOne({
      where: { classId },
      include: [
        {
          model: models.CourseDays
        },
        {
          model: models.CourseResourse
        }
      ]
    });

    if (!foundClass) {
      return errorStat(res, 404, 'Class not found');
    }

    await foundClass.destroy();

    return successStat(res, 201, 'data', 'Delete Successful');
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
