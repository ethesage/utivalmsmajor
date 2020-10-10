/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const addStudentSchema = Joi.object().keys({
  studentId: Joi.string().uuid().trim().required(),
  courseCohortId: Joi.string().uuid().trim().required(),
});

export const getStudentSchema = Joi.object().keys({
  courseCohortId: Joi.string().uuid().trim().required(),
});

export const getStudentCourseSchema = Joi.object().keys({
  courseCohortId: Joi.string().uuid().trim().required(),
});

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
