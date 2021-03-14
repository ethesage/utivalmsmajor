/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
import models from '../database/models';
import helpers from '../helpers';
import Mail from '../services/mail/email';

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
  const { courseCohortId, insertUser = [], amount } = req.body.checkout;
  const { id, firstName, email } = req.session.user;

  const cour = await models.CourseCohort.findOne({
    where: { id: courseCohortId },
  });

  if (!cour) {
    return errorStat(res, 404, 'Course does not exist');
  }

  if (!insertUser[0]) {
    const resource = await models.StudentCourse.findOne({
      where: { studentId: id, courseCohortId },
    });

    const course = await models.Course.findOne({
      where: { id: cour.courseId },
      include: [
        {
          model: models.Classes,
          attributes: ['link'],
          include: [
            {
              model: models.CohortClassDays,
              attributes: ['date', 'time'],
              order: [['date', 'ASC']],
            },
          ],
        },
      ],
      order: [[models.Classes, models.CohortClassDays, 'date', 'ASC']],
    });

    if (
      resource &&
      (resource.paymentComplete === true || resource.paymentComplete === null)
    ) {
      return errorStat(res, 404, 'Student is Already Taking This Course');
    }
    let studC;

    if (cour.paymentType === 'split' && !resource) {
      studC = await models.StudentCourse.create({
        ...req.body.checkout,
        isCompleted: false,
        studentId: id,
        progress: 0,
        courseId: cour.courseId,
        expiresAt: cour.expiresAt,
        cohortId: cour.cohortId,
        status: 'ongoing',
        courseAmount: course.cost,
        amountPaid: amount,
        paymentComplete: Number(amount) >= Number(course.cost),
      });

      // SEND EMAIL TO STUDENT IF SPLIT PAYMENT
      const mail = new Mail({
        to: email,
      });

      const resp = mail.getCohortmail(
        course.name,
        { firstName },
        {
          date: course.Classes[0].CohortClassDays[0].dataValues.date,
          time: course.Classes[0].CohortClassDays[0].dataValues.time,
        }
      );
      if (resp) {
        mail.sendMail();
      }
    } else if (
      cour.paymentType === 'split' &&
      resource &&
      resource.paymentComplete === false
    ) {
      studC = resource.update({
        amountPaid: Number(resource.amountPaid) + Number(amount),
        paymentComplete:
          Number(resource.amountPaid) + Number(amount) >= Number(course.cost),
      });
    } else {
      studC = await models.StudentCourse.create({
        ...req.body.checkout,
        isCompleted: false,
        expiresAt: cour.expiresAt,
        status: 'ongoing',
        paymentComplete: true,
        courseAmount: course.cost,
        amountPaid: amount,
        cohortId: cour.cohortId,
        studentId: id,
        progress: 0,
        courseId: cour.courseId,
      });

      const mail = new Mail({
        to: email,
      });

      // SEND EMAIL TO STUDENT IF NOT SPLIT PAYMENT
      const resp = mail.getCohortmail(
        course.name,
        { firstName },
        {
          date: course.Classes[0].CohortClassDays[0].dataValues.date,
          time: course.Classes[0].CohortClassDays[0].dataValues.time,
        }
      );
      if (resp) {
        mail.sendMail();
      }
    }

    await models.CourseProgress.create({
      courseId: cour.courseId,
      userId: id,
      progress: 0,
    });

    await cour.update({
      totalStudent: cour.totalStudent + 1,
    });

    return successStat(res, 200, 'data', {
      ...studC.dataValues,
      message: 'Student added successfully',
    });
  }

  await cour.update({
    totalStudent: cour.totalStudent + insertUser.length,
  });

  const data = [];

  await insertUser.forEach((user) => {
    data.push({
      studentId: user.studentId,
      courseCohortId,
      isCompleted: false,
      expiresAt: cour.expiresAt,
      cohortId: cour.cohortId,
      status: 'ongoing',
      courseId: cour.courseId,
      progress: 0,
      paymentComplete: true,
      courseAmount: cour.cost,
      amountPaid: cour.cost,
    });
  });
  const studC = await models.StudentCourse.bulkCreate(data, {
    returing: true,
    allowDuplicates: false,
  });

  return successStat(res, 200, 'data', {
    ...studC.dataValues,
    message: 'Student(s) added Successfully',
  });
};

export const checkStatus = async (req, res) => {
  const { courseCohortId } = req.body.checkout;

  if (!req.session.user) {
    return successStat(res, 200, 'data', {
      message: 'Not Enrolled',
    });
  }

  const { id } = req.session.user;

  const cour = await models.CourseCohort.findOne({
    where: { id: courseCohortId },
  });

  if (!cour) {
    return errorStat(res, 404, 'Course does not exist');
  }

  const resource = await models.StudentCourse.findOne({
    where: { studentId: id, courseCohortId },
  });

  if (resource) {
    return successStat(res, 200, 'Student is Already Taking This Course');
  }

  return successStat(res, 200, 'data', {
    message: 'Not Enrolled',
  });
};
