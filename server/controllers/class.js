/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import sequelize from 'sequelize';
// import { paginate, calculateLimitAndOffset } from 'paginate-info';
import models from '../database/models';
import helpers from '../helpers';
// import  from "../helpers"

const { successStat, errorStat } = helpers;

/**
 * / @static
 * @description Allows a staff to create a course
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const createClass = async (req, res) => {
  const {
    resourceLink,
    users,
    courseCohortId,
    classId,
    date,
    time,
  } = req.body.class;

  const courseCohort = await models.CourseCohort.findOne({
    where: { id: courseCohortId },
  });

  if (!courseCohort) {
    return errorStat(res, 404, 'Course Cohort does not exist');
  }

  const classCreate = await models.Classes.create({
    ...req.body.class,
  });

  const resource = resourceLink
    ? await models.ClassResources.create({
        ...req.body.class,
        link: resourceLink,
        classId: classCreate.id,
      })
    : [];

  await courseCohort.update({
    totalClasses: courseCohort.totalClasses + 1,
  });

  // await models.CohortTrainer.destroy({ where: { classId: classCreate.id } })

  let trainers = [];

  if (users) {
    const descVals = users.map((desc) => ({
      userId: desc.userId,
      courseCohortId,
      classId: classCreate.id,
    }));

    trainers = await models.CohortTrainer.bulkCreate(descVals, {
      ignoreDuplicates: true,
    });
  }

  const day = await models.CohortClassDays.create({
    classId,
    courseCohortId,
    date,
    time,
  });

  return successStat(res, 201, 'data', {
    ...classCreate.dataValues,
    ClassResources: resource,
    ClassDays: [day],
    Trainer: trainers,
  });
};

export const getClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const allClass = await models.Classes.findOne({
      where: { id: classId },
      include: [
        {
          model: models.ClassDays,
        },
        {
          model: models.ClassResources,
        },
      ],
    });

    if (!allClass) return errorStat(res, 404, 'Class Not Found');

    return successStat(res, 200, 'data', allClass);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllClass = async (req, res) => {
  const { courseCohortId } = req.params;

  try {
    const allClass = await models.Classes.findAll({
      where: { courseCohortId },
      include: [
        {
          model: models.CourseDays,
        },
        {
          model: models.CourseResouces,
        },
      ],
    });

    if (!allClass[0]) {
      return errorStat(res, 404, 'No class Found for this course');
    }

    return successStat(res, 200, 'data', allClass);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllStudentClass = async (req, res) => {
  const { id } = req.session.user;

  try {
    const resource = await models.StudentCourse.findAll({
      limit: 1,
      where: { studentId: id },
      include: [
        {
          model: models.CourseCohort,
          include: [
            {
              model: models.Classes,
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!resource[0]) {
      return errorStat(res, 404, 'No Course Found');
    }

    return successStat(res, 200, 'data', resource);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllTrainerClass = async (req, res) => {
  const { id } = req.session.user;

  try {
    const resource = await models.CourseCohort.findAll({
      limit: 1,
      include: [
        {
          model: models.Classes,
          where: { userId: id },
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!resource[0]) {
      return errorStat(res, 404, 'No Course Found');
    }

    return successStat(res, 200, 'data', resource);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateClass = async (req, res) => {
  const {
    courseCohortId,
    classId,
    cohortClassDaysId,
    date,
    time,
    users,
  } = req.body;

  let trainers = [];

  await models.CohortTrainer.destroy({ where: { classId, courseCohortId } });

  await models.Classes.update(
    {
      ...req.body,
    },
    { where: { id: classId } }
  );

  const resource = await models.ClassResources.findAll({
    where: { classId },
  });

  if (users) {
    const descVals = users.map((desc) => ({
      userId: desc.userId,
      courseCohortId,
      classId,
    }));

    trainers = await models.CohortTrainer.bulkCreate(descVals, {
      ignoreDuplicates: true,
    });
  }

  const updatedClass = await models.Classes.findOne({
    where: { id: classId },
    include: [
      {
        model: models.CohortTrainer,
        where: { courseCohortId },
        attributes: ['id', 'userId'],
        required: false,
        include: {
          model: models.User,
          attributes: ['firstName', 'lastName', 'profilePic', 'occupation'],
        },
      },
      {
        model: models.CohortClassVideo,
        attributes: ['id', 'link'],
        where: { courseCohortId },
        required: false,
      },
    ],
  });

  if (cohortClassDaysId) {
    await models.CohortClassDays.update(
      { ...req.body },
      { where: { classId, id: cohortClassDaysId } }
    );

    const updateClassdays = await models.CohortClassDays.findAll({
      where: { classId },
    });

    successStat(res, 200, 'data', {
      ...updatedClass.dataValues,
      ClassResources: resource || [],
      CohortClassDays: updateClassdays,
    });
  } else {
    const days = await models.CohortClassDays.create({
      classId,
      courseCohortId,
      date,
      time,
    });

    return successStat(res, 200, 'data', {
      ...updatedClass.dataValues,
      ClassResources: resource || [],
      CohortClassDays: days,
    });
  }
};

export const deleteClass = async (req, res) => {
  const { classId } = req.body.course;

  try {
    const foundClass = await models.Class.findOne({
      where: { id: classId },
      include: [
        {
          model: models.CourseDays,
        },
        {
          model: models.CourseResourse,
        },
      ],
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

export const classAssignment = async (req, res) => {
  const { classId } = req.body.class;
  // console.log(classId);
  try {
    const findClass = await models.Classes.findOne({
      where: { id: classId },
    });

    if (!findClass) return errorStat(res, 404, 'Class not found');

    const createAssignment = await models.ClassResources.create({
      ...req.body.class,
      type: 'assignment',
    });
    return successStat(res, 201, 'data', {
      ...createAssignment.dataValues,
      message: 'Class Assignment created successfully',
    });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const editClassAssignment = async (req, res) => {
  const { classResourceId } = req.body.class;

  try {
    const findAssignment = await models.ClassResources.findOne({
      where: { id: classResourceId },
    });

    if (!findAssignment) {
      return errorStat(res, 404, 'Class Assignment not found');
    }

    await findAssignment.update({
      ...req.body.class,
    });

    return successStat(res, 201, 'data', {
      ...findAssignment.dataValues,
      message: 'Class Assignment created successfully',
    });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const deleteClassAssignment = async (req, res) => {
  const { classResourcesId } = req.body.class;
  try {
    const findAssignment = await models.ClassResources.findOne({
      where: { id: classResourcesId },
    });

    if (!findAssignment) {
      return errorStat(res, 404, 'Class Assignment not found');
    }

    await findAssignment.destroy();

    return successStat(
      res,
      201,
      'data',
      'Class Assignment deleted successfully'
    );
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const addClassResources = async (req, res) => {
  const { classId } = req.body.class;
  try {
    const findClass = await models.Classes.findOne({
      where: { id: classId },
    });

    if (!findClass) return errorStat(res, 404, 'Class not found');

    const createResource = await models.ClassResources.create({
      ...req.body.class,
      type: 'resource',
    });
    return successStat(res, 201, 'data', {
      ...createResource.dataValues,
      message: 'Class Resource created successfully',
    });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
