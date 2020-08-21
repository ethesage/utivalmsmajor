/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const createClassroom = Joi.object().keys({
//   studentId: Joi.string().uuid().trim().required(),
  courseCohortId: Joi.string().uuid().trim().required(),
  // cohortId: Joi.string().uuid().trim().required(),
  trainerId: Joi.string().uuid().trim().required(),
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  link: Joi.string().trim().required(),
  dateRange: Joi.string().required(),
  resourceLink: Joi.string().trim().required(),
  type: Joi.string().trim().required().valid('video', 'pdf', 'doc', 'xlx', 'ppt'),
  date: Joi.string().required(),
  time: Joi.string().required(),
});

// export const getStudentSchema = Joi.object().keys({
//   studentCourseId: Joi.string().uuid().trim().required(),
// });

// export const courseTrainerSchema = Joi.object().keys({
//   courseId: Joi.string().uuid().trim().required(),
// });

// export const updateTrainerSchema = Joi.object().keys({
//   trainerId: Joi.string().uuid().trim().required(),
//   courseId: Joi.string().uuid().trim(),
//   userId: Joi.string().uuid().trim(),
// });

// export const trainerSchema = Joi.object().keys({
//   trainerId: Joi.string().uuid().trim().required(),
// });
