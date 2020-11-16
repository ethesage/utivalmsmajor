/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const createCohort = Joi.object().keys({
  cohort: Joi.string().required(),
});

export const addcourse = Joi.object().keys({
  courseId: Joi.string().uuid().trim().required(),
  cohort: Joi.string().trim(),
  expiresAt: Joi.string().required(),
  folderId: Joi.string().required(),
  dateRange: Joi.string().required(),
});

export const getCourseSchema = Joi.object().keys({
  courseId: Joi.string().uuid().trim().required(),
});

export const getAllCourseSchema = Joi.object().keys({
  currentPage: Joi.number().required(),
  pageLimit: Joi.number().required(),
});

export const updateCohortSchema = Joi.object().keys({
  cohort: Joi.string(),
  cohortId: Joi.string().uuid().trim().required(),
  status: Joi.string().valid('ongoing', 'finished'),
});

export const updateCohorCoursetSchema = Joi.object().keys({
  expiresAt: Joi.string(),
  dateRange: Joi.string(),
  courseCohortId: Joi.string().uuid().trim().required(),
  status: Joi.string().valid('ongoing', 'finished'),
});
