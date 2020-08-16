/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
// import { paginate, calculateLimitAndOffset } from 'paginate-info';
import models from "../database/models";
import helpers from "../helpers";
// import  from "../helpers"

const { successStat, errorStat } = helpers;

// const { Op } = sequelize;

/**
 * / @static
 * @description Allows a staff to create a course
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const getActivity = async (req, res) => {
  const { studentId } = req.body.activity;
  try {
    const activities = await models.Assignment.findAll({
      where: { studentId }
    });

    if (!activities) return errorStat(res, 404, 'No activity found');

    return successStat(res, 201, 'data', activities);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
