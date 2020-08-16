import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;

/**
 * / @static
 * @description Allows a staff to create a course
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const createFile = async (req, res) => {
  const { id } = req.session.user;
  try {
    const file = await models.File.create({
      ...req.body.file,
      userId: id
    });

    return successStat(res, 201, 'data', { ...file.dataValues, message: 'File Successfully Created' });
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getFile = async (req, res) => {
  const { fileId } = req.body.file;
  const { id } = req.session.user;

  try {
    const file = await models.File.findOne({
      where: {
        userId: id,
        id: fileId
      }
    });

    if (!file) return errorStat(res, 404, 'File not found');

    return successStat(res, 200, 'data', file);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllFiles = async (req, res) => {
  const { id } = req.session.user;

  try {
    const files = await models.File.findAll({
      where: { userId: id }
    });

    if (!files[0]) return errorStat(res, 404, 'No file found');

    return successStat(res, 200, 'data', files);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateFile = async (req, res) => {
  const { fileId, name } = req.body.file;
  const { id } = req.session.user;

  try {
    const file = await models.File.findOne({
      where: {
        id: fileId,
        userId: id
      }
    });

    if (!file) return errorStat(res, 404, 'File not found');

    await file.update({
      name
    });

    return successStat(res, 200, 'data', file);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const deleteFile = async (req, res) => {
  const { fileId } = req.body.file;
  const { id } = req.session.user;
  try {
    const file = await models.File.findOne({
      where: {
        id: fileId,
        userId: id
      }
    });

    if (!file) return errorStat(res, 404, 'File not found');

    await file.destroy();

    return successStat(res, 200, 'data', 'Delete Successful');
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
