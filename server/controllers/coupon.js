/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
import { paginate, calculateLimitAndOffset } from 'paginate-info';
import models from '../database/models';
import helpers from '../helpers';
// import { generateToken } from '../helpers/auth';

const { successStat, errorStat, generatePassword } = helpers;

// const { Op } = sequelize;

/**
 * / @static
 * @description Allows a admin to create a coupon
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const generateCouponCode = async (req, res) => {
  const { firstName, lastName } = req.session.user;

  const code = await generatePassword(8, true);

  const createCoupon = await models.Coupon.create({
    ...req.body.coupon,
    code,
    expired: false,
    totalUsedCount: 0,
    createdBy: `${firstName} ${lastName}`,
  });

  return successStat(res, 201, 'data', createCoupon);
};

export const getAllCouponCode = async (req, res) => {
  const { pageLimit, currentPage } = req.body.coupon;

  const { offset, limit } = calculateLimitAndOffset(currentPage, pageLimit);

  const sqlQueryMap = {
    offset,
    limit,
  };

  const { rows, count } = await models.Coupon.findAndCountAll({
    ...sqlQueryMap,
  });

  const paginationMeta = paginate(currentPage, count, rows, pageLimit);

  return successStat(res, 201, 'data', { paginationMeta, rows });
};

export const getCouponCode = async (req, res) => {
  const { couponId } = req.body.coupon;

  const couponDetails = await models.Coupon.findOne({
    where: { id: couponId },
  });

  if (!couponDetails) return errorStat(res, 404, 'Coupon Not Found');

  return successStat(res, 201, 'data', couponDetails);
};

export const useCouponCode = async (req, res) => {
  // const { code, courseCohortId } = req.body.coupon;

  const { id } = req.session.user;

  const couponDetails = await models.Coupon.findOne({
    where: { ...req.body.coupon },
  });

  if (!couponDetails) return errorStat(res, 404, 'Coupon Not Found');

  if (couponDetails.expired) return errorStat(res, 400, 'Expired Coupon Code');

  const savedCoupon = await models.SavedCoupon.findOne({
    where: { userId: id, couponId: couponDetails.id },
  });

  if (savedCoupon) {
    return errorStat(res, 404, 'Coupon already used by this user');
  }

  couponDetails.update({
    totalUsedCount: couponDetails.totalUsedCount + 1,
    expired: couponDetails.limit
      ? couponDetails.totalUsedCount + 1 >= couponDetails.limit
      : false,
  });

  await models.SavedCoupon.create({
    userId: id,
    couponId: couponDetails.id,
  });

  return successStat(res, 201, 'data', couponDetails);
};

export const updateCouponCode = async (req, res) => {
  const { code } = req.body.coupon;

  const couponDetails = await models.Coupon.findOne({
    where: { code },
  });

  if (!couponDetails) return errorStat(res, 404, 'Coupon Not Found');

  couponDetails.update({
    ...req.body.coupon,
  });

  return successStat(res, 201, 'data', couponDetails);
};

export const deleteCouponCode = async (req, res) => {
  const { couponId } = req.body.coupon;

  const couponDetails = await models.Coupon.findOne({
    where: { id: couponId },
  });

  if (!couponDetails) return errorStat(res, 404, 'Coupon Not Found');

  couponDetails.destroy({});

  return successStat(res, 201, 'data', 'Delete Successful');
};
