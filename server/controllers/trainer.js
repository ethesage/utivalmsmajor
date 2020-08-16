import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;
/**
 * / @static
 * @description Allows a staff to create a course
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const createTrainer = async (req, res) => {
  const { userId, courseId } = req.body.trainer;

  try {
    const isUser = await models.User.findOne({
      wher: { id: userId }
    });

    if (!isUser) {
      return errorStat(res, 404, 'User does not exist');
    }

    const course = await models.Course.findOne({
      where: { id: courseId }
    });

    if (!course) {
      return errorStat(res, 404, 'Course not found');
    }

    const isExist = await models.Trainer.findOne({
      where: { courseId, userId }
    });

    if (isExist) {
      return errorStat(res, 404, 'Trainer is Already Assigned To This Course');
    }

    const trainer = await models.Trainer.create({
      userId,
      courseId
    });

    return successStat(res, 201, 'data', { ...trainer.dataValues, message: 'Trainer Created' });
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllTrainerCourse = async (req, res) => {
  const { userId } = req.body.trainer;

  try {
    const trainerCourse = await models.Trainer.findAll({
      where: { userId },
    });

    if (!trainerCourse[0]) {
      return errorStat(res, 404, 'User not assigned to any course ');
    }
    return successStat(res, 200, 'data', trainerCourse);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllTrainer = async (req, res) => {
  const { courseId } = req.body.trainer;

  try {
    const trainers = await models.Trainer.findAll({
      where: { courseId },
    });

    if (!trainers) {
      return errorStat(res, 404, 'No Trainer Found');
    }

    return successStat(res, 200, 'data', trainers);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getSingleTrainer = async (req, res) => {
  const { trainerId } = req.body.trainer;

  try {
    const trainer = await models.Trainer.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      return errorStat(res, 404, 'Trainer Not Found');
    }

    return successStat(res, 200, 'data', trainer);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateTrainer = async (req, res) => {
  const { trainerId } = req.body.trainer;

  try {
    const trainer = await models.Trainer.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      return errorStat(res, 404, 'Trainer not found');
    }

    const update = await trainer.update({
      ...req.body.trainer
    });

    return successStat(res, 200, 'data', update);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const deleteTrainer = async (req, res) => {
  const { trainerId } = req.body.trainer;

  try {
    const trainer = await models.Trainer.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      return errorStat(res, 404, 'Trainer not found');
    }

    await trainer.destroy();

    return successStat(res, 200, 'data', 'Delete Successful');
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
