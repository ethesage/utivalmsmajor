/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const createCourse = Joi.object().keys({
  name: Joi.string().lowercase().required(),
  description: Joi.string().lowercase().required(),
  duration: Joi.string().required(),
  //   link: Joi.string().required(),
  coupon: Joi.string(),
  learnMore: Joi.string().required(),
  trainerId: Joi.string().uuid().trim(),
  cohort: Joi.string().lowercase(),
  cost: Joi.number().required(),
  dateRange: Joi.string().lowercase(),
  level: Joi.string().lowercase(),
  //   status: Joi.string().lowercase(),
  extLink: Joi.string().lowercase().required(),
  totalClasses: Joi.number().required(),
  courseDescription: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  })),
  thumbnail: Joi.object()
});

export const getCourseSchema = Joi.object().keys({
  courseId: Joi.string().uuid().trim().required(),
  name: Joi.string().lowercase(),
  description: Joi.string().lowercase(),
  duration: Joi.string(),
  //   link: Joi.string(),
  coupon: Joi.string(),
  learnMore: Joi.string(),
  trainerId: Joi.string().uuid().trim(),
  cohort: Joi.string().lowercase(),
  cost: Joi.number(),
  dateRange: Joi.string().lowercase(),
  level: Joi.string().lowercase(),
  //   status: Joi.string().lowercase(),
  extLink: Joi.string().lowercase(),
  thumbnail: Joi.object()
});

export const getCourseDescriptionSchema = Joi.object().keys({
  courseDescriptionId: Joi.string().uuid().trim().required(),
  title: Joi.string(),
  description: Joi.string(),
});

export const getAllCourseSchema = Joi.object().keys({
  currentPage: Joi.number().required(),
  pageLimit: Joi.number().required(),
});
