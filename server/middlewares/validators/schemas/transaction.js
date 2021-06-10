/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const transactionSchema = Joi.object().keys({
  courseId: Joi.string().uuid().trim().required(),
  email: Joi.string().email().trim().required(),
  tnxRef: Joi.string().trim().required(),
  transactionId: Joi.string().trim(),
  paidAmount: Joi.string().trim().required(),
  currency: Joi.string().trim(),
  courseCohortId: Joi.string().uuid().trim().required(),
  studentId: Joi.string().uuid().trim(),
  name: Joi.string().trim(),
  status: Joi.string().trim(),
  courseAmount: Joi.string().trim().required(),
});
