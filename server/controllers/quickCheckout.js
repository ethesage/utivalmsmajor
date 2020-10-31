/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;

// const { Op } = sequelize;

/**
 * / @static
 * @description Allows a staff to student
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const quickCheckout = async (req, res) => {
  const { courseCohortId } = req.body.checkout;
  const { id } = req.session.user;

  try {
    const cour = await models.CourseCohort.findOne({
      where: { id: courseCohortId },
    });

    if (!cour) {
      return errorStat(res, 404, "Course does not exist");
    }

    const resource = await models.StudentCourse.findOne({
      where: { studentId: id, courseCohortId },
    });

    if (resource) {
      return errorStat(res, 404, "Student is Already Taking This Course");
    }

    const studC = await models.StudentCourse.create({
      ...req.body.checkout,
      studentId: id,
      isCompleted: false,
      expiresAt: cour.expiresAt,
      cohortId: cour.cohortId,
      status: "ongoing",
      courseId: cour.courseId
    });

    await models.CourseProgress.create({
      courseId: cour.courseId,
      userId: id,
      progress: 0,
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

export const checkStatus = async (req, res) => {
  const { courseCohortId } = req.body.checkout;
  const { id } = req.session.user;

  try {
    const cour = await models.CourseCohort.findOne({
      where: { id: courseCohortId },
    });

    if (!cour) {
      return errorStat(res, 404, "Course does not exist");
    }

    const resource = await models.StudentCourse.findOne({
      where: { studentId: id, courseCohortId },
    });

    if (resource) {
      return errorStat(res, 404, "Student is Already Taking This Course");
    }

    return successStat(res, 200, "data", {
      message: "Not Enrolled",
    });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, "Operation Failed, Please Try Again");
  }
};
