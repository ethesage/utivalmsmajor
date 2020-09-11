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

// export const createAssignment = async (req, res) => {
//   try {
//     const assignmentCreate = await models.Assignment.create({
//       ...req.body.assignment,
//     });
//     return successStat(res, 201, 'data', { ...assignmentCreate, message: 'Assignment created successfully' });
//   } catch (e) {
//     console.log(e);
//     errorStat(res, 500, 'Operation Failed, Please Try Again');
//   }
// };

// export const getStudentAssignment = async (req, res) => {
// //   const { classId } = req.body.course;

//   try {
//     const assignmentCreate = await models.Assignment.create({
//       ...req.body.assignment,
//     });
//     return successStat(res, 201, 'data', { ...assignmentCreate, message: 'Assignment created successfully' });
//   } catch (e) {
//     console.log(e);
//     errorStat(res, 500, 'Operation Failed, Please Try Again');
//   }
// };

export const getClassAssignment = async (req, res) => {
  const { classId } = req.body.assignment;

  try {
    const allClassAssignment = await models.Class.findAll({
      where: { id: classId },
      attributes: [],
      include: [
        {
          model: models.Assignment,
          attributes: ['fileId']
        },
      ]
    });

    // if (!allClass[0]) return errorStat(res, 404, 'No class Found for this course');

    return successStat(res, 201, 'data', allClassAssignment);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};


export const submitAssignment = async (req, res) => {
  const { classId, classResourcesId, resourceLink } = req.body.assignment;
  const { id } = req.session.user

  console.log(classId, classResourcesId)

  try {
    const findClassAssignment = await models.Classes.findOne({
      where: { id: classId },
      include: [
        {
          model: models.ClassResouces,
          where: {
            id: classResourcesId,
            classId,
            type: 'assignment'
          }
        }
      ]
    })

    if (!findClassAssignment) return errorStat(res, 404, 'Class Assignment not found')


    await models.Assignment.create({
      studentId: id,
      resourceLink,
      submitDate: new Date(),
      classId,
      isGraded: false,
      classResourcesId
    });

    return successStat(res, 201, 'data', 'Assignment Submited Sussceessfully');
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const gradeStudentAssignment = async (req, res) => {
  const { assignmentId, classId } = req.body.assignment;
  const { id, role, firstName, lastName } = req.session.user;

  try {
    const checkTrainer = await models.Classes.findOne({
      where: { id: classId },
      include: [{
        model: models.Trainer,
        where: { userId: id }
      }]
    })

    if (!checkTrainer || role === 'student') return errorStat(res, 403, 'Cant Grade Assignment')


    const foundAssignment = await models.Assignment.findOne({
      where: { id: assignmentId }
    });

    if (!foundAssignment) {
      return errorStat(res, 404, 'Assignment not found');
    }

    const updateAssignmet = await foundAssignment.update({
      ...req.body.assignment,
      isGraded: true,
      gradeDate: new Date(),
      gradedBy: `${firstName} ${lastName}`
    });


    return successStat(res, 201, 'data', updateAssignmet);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const editSubmittedAssignment = async (req, res) => {
    const { assignmentId } = req.body.assignment;
    
  try {
    const findAssignment = await models.Assignment.findOne({
      where: { id: assignmentId }
    })

    if (!findAssignment) return errorStat(res, 404, 'Assignment not found');

    if (findAssignment.isGraded) return errorStat(res, 400, 'Cannot Edit Graded Assignment');

    await findAssignment.update({
      ...req.body.assignment,
    });

    return successStat(res, 200, 'data', { ...findAssignment.dataValues, message: 'Assignment updated successfully' });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};


export const deleteAssignment = async (req, res) => {
  const { assignmentId } = req.body.assignment;
  const { id } = req.session.user;
    
  try {
    const findAssignment = await models.Assignment.findOne({
      where: { id: assignmentId }
    })

    if (!findAssignment) return errorStat(res, 404, 'Assignment not found');

    if (findAssignment.studentId !== id) return errorStat(res, 400, 'Forbidden Access');

    if (findAssignment.isGraded) return errorStat(res, 400, 'Cannot Delete Graded Assignment');


    await findAssignment.destroy();
    return successStat(res, 201, 'data', { message: 'Assignment deleted successfully' });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};


