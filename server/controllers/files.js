import models from '../database/models';
import helpers from '../helpers';

const {
  successStat,
  errorStat,
  getFolderListings,
  deleteImage,
  uploadData,
} = helpers;

/**
 * / @static
 * @description Allows a staff to create a course
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const createFile = async (req, res) => {
  // const { id } = req.session.user;
  const { file, path, fileName } = req.body;

  const fileUpload = await uploadData(file, path, fileName);

  return successStat(res, 201, 'data', fileUpload);
};

export const getFile = async (req, res) => {
  const { fileId } = req.body.file;
  const { id } = req.session.user;

  const file = await models.File.findOne({
    where: {
      userId: id,
      id: fileId,
    },
  });

  if (!file) return errorStat(res, 404, 'File not found');

  return successStat(res, 200, 'data', file);
};

export const getAllFiles = async (req, res) => {
  const { key } = req.query;

  const fileList = await getFolderListings(key);

  const content =
    fileList &&
    fileList.Contents.reduce((acc, list) => {
      if (list.Key !== key) {
        acc.push({
          Key: list.Key,
          Size: list.Size,
        });
      }

      return acc;
    }, []);

  // console.log(content);

  return successStat(res, 200, 'data', content);
};

export const updateFile = async (req, res) => {
  const { fileId, name } = req.body.file;
  const { id } = req.session.user;

  const file = await models.File.findOne({
    where: {
      id: fileId,
      userId: id,
    },
  });

  if (!file) return errorStat(res, 404, 'File not found');

  await file.update({
    name,
  });

  return successStat(res, 200, 'data', file);
};

export const deleteFile = async (req, res) => {
  const { path } = req.query;

  await deleteImage(path);

  return successStat(res, 200, 'data', 'Delete Successful');
};
