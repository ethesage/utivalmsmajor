import sequelize from 'sequelize';
import models from '../database/models';
import helpers from '../helpers';

const { successStat, errorStat } = helpers;

const { Op } = sequelize;
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
      where: { id: userId },
    });

    if (!isUser) {
      return errorStat(res, 404, 'User does not exist');
    }

    const course = await models.Course.findOne({
      where: { id: courseId },
    });

    if (!course) {
      return errorStat(res, 404, 'Course not found');
    }

    const isExist = await models.Trainer.findOne({
      where: { courseId, userId },
    });

    if (isExist) {
      return errorStat(res, 404, 'Trainer is Already Assigned To This Course');
    }

    const trainer = await models.Trainer.create({
      userId,
      courseId,
    });

    return successStat(res, 201, 'data', {
      ...trainer.dataValues,
      message: 'Trainer Created',
    });
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllTrainerCourse = async (req, res) => {
  const { id } = req.session.user;

  const trainerCourse = await models.CohortTrainer.findAll({
    where: { userId: id },
    attributes: ['id'],
    include: [
      {
        model: models.Cohort,
        attributes: ['cohort', 'id'],
      },
      {
        model: models.Course,
        attributes: ['id', 'name', 'thumbnail'],
      },
      {
        model: models.CourseCohort,
        attributes: ['id', 'cohortId', 'dateRange', 'courseId'],
      },
    ],
  });

  return successStat(res, 200, 'data', trainerCourse);
};

export const getSingleTrainerCourse = async (req, res) => {
  const { id } = req.session.user;

  const { courseCohortId } = req.body.trainer;
  const resource = await models.CohortTrainer.findOne({
    where: { userId: id, courseCohortId },
    include: [
      {
        model: models.Cohort,
      },
      {
        model: models.Course,
        attributes: ['id', 'name', 'description', 'thumbnail', 'list_desc'],
        include: [
          {
            model: models.CourseDescription,
          },
          {
            model: models.CourseProgress,
            where: { userId: id },
            required: false,
          },
          {
            model: models.CourseDescription,
          },
          {
            model: models.Classes,
            required: false,
            include: [
              {
                model: models.CohortTrainer,
                where: { courseCohortId },
                attributes: ['id', 'userId'],
                required: false,
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
              {
                model: models.CohortClassVideo,
                attributes: ['id', 'link'],
                where: { courseCohortId },
                required: false,
              },
              {
                model: models.CohortClassDays,
                where: { courseCohortId },
                required: false,
              },
            ],
          },
        ],
      },
      {
        model: models.CourseCohort,
      },
    ],

    order: [
      [models.Course, models.Classes, models.CohortClassDays, 'date', 'ASC'],
    ],
  });

  if (!resource) {
    return errorStat(res, 404, 'Trainer Course Not Found');
  }

  // if (!resource.isCompleted && new Date() > resource.duration) {
  //   resource.update({
  //     isCompleted: true,
  //     status: 'finished',
  //   });
  // }

  return successStat(res, 200, 'data', resource);
};

export const getAllTrainer = async (req, res) => {
  const { courseId } = req.body.trainer;

  const trainers = await models.CohortTrainer.findAll({
    where: { courseId },
  });

  if (!trainers) {
    return errorStat(res, 404, 'No Trainer Found');
  }

  return successStat(res, 200, 'data', trainers);
};

export const getSingleTrainer = async (req, res) => {
  const { trainerId } = req.body.trainer;

  const trainer = await models.CohortTrainer.findOne({
    where: { id: trainerId },
  });

  if (!trainer) {
    return errorStat(res, 404, 'Trainer Not Found');
  }

  return successStat(res, 200, 'data', trainer);
};

export const updateTrainer = async (req, res) => {
  const { trainerId } = req.body.trainer;

  const trainer = await models.CohortTrainer.findOne({
    where: { id: trainerId },
  });

  if (!trainer) {
    return errorStat(res, 404, 'Trainer not found');
  }

  const update = await trainer.update({
    ...req.body.trainer,
  });

  return successStat(res, 200, 'data', update);
};

export const deleteTrainer = async (req, res) => {
  const { trainerId } = req.body.trainer;

  const trainer = await models.CohortTrainer.findOne({
    where: { id: trainerId },
  });

  if (!trainer) {
    return errorStat(res, 404, 'Trainer not found');
  }

  await trainer.destroy();

  return successStat(res, 200, 'data', 'Delete Successful');
};

export const getTrainerNextClass = async (req, res) => {
  const { id } = req.session.user;

  const trainerClass = await models.CohortTrainer.findAll({
    where: { userId: id },
    include: [
      {
        model: models.Course,
        attributes: ['thumbnail', 'name', 'extLink'],

        include: [
          {
            model: models.Classes,
            attributes: ['link'],
            include: [
              {
                model: models.CohortClassDays,
                where: { date: { [Op.gte]: new Date() } },
                attributes: ['date', 'time'],
                order: [['date', 'createdAt', 'ASC']],
              },
            ],
          },
        ],

        group: ['Course.id'],
      },
      {
        model: models.CourseCohort,
        attributes: ['courseId', 'id'],
      },
    ],

    // order: [[models.CohortClassDays, 'date', 'ASC']]
  });

  const isSort = (array, argument, check) => {
    const sort = array.sort((a, b) => {
      const c = new Date(
        check ? a[argument] : a.dataValues.CohortClassDays[0].dataValues.date
      );
      const d = new Date(
        check ? b[argument] : b.dataValues.CohortClassDays[0].dataValues.date
      );
      return c - d;
    });
    return sort;
  };

  isSort(
    trainerClass[0].dataValues.Course.Classes,
    'dataValues.CohortClassDays.date'
  );

  const getAll = trainerClass.reduce((acc, item, index) => {
    const n_item = item.dataValues;

    if (n_item && n_item.Course.Classes[0]) {
      const course = item.dataValues.Course.dataValues;
      const link = {
        link: item.dataValues.Course.Classes[0].dataValues.link,
      };
      const classDays =
        item.dataValues.Course.Classes[0].dataValues.CohortClassDays[0]
          .dataValues;
      const all = { ...course, ...link, ...classDays };
      acc[index] = all;
    }
    return acc;
  }, []);

  return successStat(res, 200, 'data', getAll);
};

export const getTrainerDashboard = async (req, res) => {
  const { id } = req.session.user;

  const completed = await models.CohortTrainer.count({
    where: { userId: id },
    include: {
      model: models.CourseCohort,
      where: { status: 'finished' },
    },
  });

  const ongoing = await models.CohortTrainer.count({
    where: { userId: id },
    include: {
      model: models.CourseCohort,
      where: { status: 'ongoing' },
    },
  });

  const course = await models.CohortTrainer.count({
    where: { userId: id },
  });

  return successStat(res, 200, 'data', { course, ongoing, completed });
};
