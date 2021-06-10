import express from 'express';
import 'express-async-errors';
import {
  generateCouponCode,
  getAllCouponCode,
  getCouponCode,
  useCouponCode,
  updateCouponCode,
  deleteCouponCode
} from '../../controllers/coupon';
import middlewares from '../../middlewares';

const {
  validate,
  generateCoupon,
  getAllCouponSchema,
  getCouponSchema,
  useCouponSchema,
  updateCouponSchema,
  deleteCouponSchema,
  usession,
} = middlewares;

const couponRoutes = express();

couponRoutes.post(
  '/generate',
  usession.can('coupon:crud'),
  validate(generateCoupon),
  generateCouponCode
);

couponRoutes.get(
  '/',
  usession.can('coupon:crud'),
  validate(getAllCouponSchema),
  getAllCouponCode
);

couponRoutes.get(
  '/:couponId',
  usession.can('coupon:crud'),
  validate(getCouponSchema),
  getCouponCode
);

couponRoutes.post(
  '/usecode',
  usession.can(''),
  validate(useCouponSchema),
  useCouponCode
);

couponRoutes.patch(
  '/update',
  usession.can('coupon:crud'),
  validate(updateCouponSchema),
  updateCouponCode
);

couponRoutes.delete(
  '/:couponId',
  usession.can('coupon:crud'),
  validate(deleteCouponSchema),
  deleteCouponCode
);

export default couponRoutes;
