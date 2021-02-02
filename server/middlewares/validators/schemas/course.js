/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const createCourse = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  type: Joi.string().required(),
  //   link: Joi.string().required(),
  coupon: Joi.string(),
  learnMore: Joi.string().required(),
  category: Joi.string().required(),
  trainerId: Joi.string().uuid().trim(),
  cohort: Joi.string(),
  cost: Joi.number().required(),
  dateRange: Joi.string(),
  level: Joi.string(),
  list_desc: Joi.string(),
  initialSplitAmount: Joi.number(),
  finialSplitAmount: Joi.number(),
  //   status: Joi.string(),
  // extLink: Joi.string().required(),
  // totalClasses: Joi.number().required(),
  courseDescription: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    })
  ),
  thumbnail: Joi.string(),
});

export const getCourseSchema = Joi.object().keys({
  courseId: Joi.string().uuid().trim().required(),
  name: Joi.string(),
  description: Joi.string(),
  duration: Joi.string(),
  //   link: Joi.string(),
  coupon: Joi.string(),
  learnMore: Joi.string(),
  trainerId: Joi.string().uuid().trim(),
  cohort: Joi.string(),
  cost: Joi.number(),
  dateRange: Joi.string(),
  level: Joi.string(),
  list_desc: Joi.string(),
  //   status: Joi.string(),
  extLink: Joi.string(),
  thumbnail: Joi.alternatives(Joi.string(), Joi.object()),
  type: Joi.string().required(),
  //   link: Joi.string().required(),
  category: Joi.string().required(),
  initialSplitAmount: Joi.number(),
  finialSplitAmount: Joi.number(),
});

export const getCourseDescriptionSchema = Joi.object().keys({
  courseDescriptionId: Joi.string().uuid().trim(),
  title: Joi.string(),
  description: Joi.string(),
  courseId: Joi.string(),
});

export const getAllCourseSchema = Joi.object().keys({
  currentPage: Joi.number().required(),
  pageLimit: Joi.number().required(),
});

export const getAllMainCourseSchema = Joi.object().keys({
  currentPage: Joi.number().required(),
  pageLimit: Joi.number().required(),
  category: Joi.string().required(),
});

export const addCourseCohortProgressSchema = Joi.object().keys({
  courseCohortId: Joi.string().uuid().trim().required(),
  classId: Joi.string().uuid().trim().required(),
});
