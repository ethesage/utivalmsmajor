/* eslint-disable import/prefer-default-export */
import Joi from "@hapi/joi";

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

export const addStudentProgressSchema = Joi.object().keys({
  courseCohortId: Joi.string().uuid().trim().required(),
  classId: Joi.string().uuid().trim().required(),
});
