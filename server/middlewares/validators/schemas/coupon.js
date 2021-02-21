/* eslint-disable import/prefer-default-export */
import Joi from "@hapi/joi";

export const generateCoupon = Joi.object().keys({
  amount: Joi.string().required(),
  limit: Joi.number(),
  courseCohortId: Joi.string().uuid().trim(), 
});

export const getAllCouponSchema = Joi.object().keys({
  currentPage: Joi.number().required(),
  pageLimit: Joi.number().required(),
});


export const getCouponSchema = Joi.object().keys({
  couponId: Joi.string().uuid().trim().required(),
});

export const useCouponSchema = Joi.object().keys({
  code: Joi.string().required(),
  courseCohortId: Joi.string().uuid().trim(), 
});

export const updateCouponSchema = Joi.object().keys({
  amount: Joi.number(),
  code: Joi.string().required(),
  limit: Joi.number(),
  expired: Joi.boolean(),
  courseCohortId: Joi.string().uuid().trim(), 
});

export const deleteCouponSchema = Joi.object().keys({
  couponId: Joi.string().uuid().trim().required(),
});
