/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const checkoutSchema = Joi.object().keys({
  courseCohortId: Joi.string().uuid().trim().required(),
  amount: Joi.number(),
  insertUser: Joi.array()
});
