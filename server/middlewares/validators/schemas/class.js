/* eslint-disable import/prefer-default-export */
import Joi from "@hapi/joi";

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
  type: Joi.string()
    .trim()
    .required()
    .valid("video", "pdf", "doc", "xlx", "ppt"),
  date: Joi.string().required(),
  time: Joi.string().required(),
});

export const getClassAssignmentSchema = Joi.object().keys({
  classId: Joi.string().uuid().trim().required(),
  link: Joi.string().trim().required(),
});

export const editClassAssignmentSchema = Joi.object().keys({
  classResourceId: Joi.string().uuid().trim().required(),
  link: Joi.string().trim(),
  deadline: Joi.string().trim(),
  title: Joi.string().trim(),
  description: Joi.string(),
  point: Joi.number(),
  dueDate: Joi.date(),
});

export const deleteClassAssignmentSchema = Joi.object().keys({
  classResourcesId: Joi.string().uuid().trim().required(),
});

export const createClassAssignmentSchema = Joi.object().keys({
  classId: Joi.string().uuid().trim().required(),
  link: Joi.string().trim(),
  title: Joi.string().trim(),
  description: Joi.string(),
  point: Joi.number(),
  dueDate: Joi.date(),
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
