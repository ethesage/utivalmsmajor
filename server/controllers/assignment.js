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

export const createAssignment = async (req, res) => {
  try {
    const assignmentCreate = await models.Assignment.create({
      ...req.body.assignment,
    });
    return successStat(res, 201, 'data', { ...assignmentCreate, message: 'Assignment created successfully' });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const studentAssignment = async (req, res) => {
//   const { classId } = req.body.course;

  try {
    const assignmentCreate = await models.Assignment.create({
      ...req.body.assignment,
    });
    return successStat(res, 201, 'data', { ...assignmentCreate, message: 'Assignment created successfully' });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAssignment = async (req, res) => {
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

export const getStudentAssignment = async (req, res) => {
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

export const gradeStudentAssignment = async (req, res) => {
  const { studentAssignmentId } = req.body.course;

  try {
    const foundAssignment = await models.Class.findOne({
      where: {
        studentAssignmentId
      }
    });

    if (!foundAssignment) {
      return errorStat(res, 404, 'Assignment not found');
    }

    const updateAssignmet = await foundAssignment.update(
      ...req.body.assignment
    );

    // await foundClass.destroy();

    return successStat(res, 201, 'data', updateAssignmet);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
