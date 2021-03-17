/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const createFileSchema = Joi.object().keys({
  file: Joi.string().trim().required(),
  path: Joi.string().trim().required(),
  fileName: Joi.string().trim().required(),
  // name: Joi.string().trim().required(),
});

export const getFileSchema = Joi.object().keys({
  path: Joi.string().uuid().required(),
});

export const updateFileSchema = Joi.object().keys({
  fileId: Joi.string().uuid().trim().required(),
  name: Joi.string().trim(),
});

export const getAllFileSchema = Joi.object().keys({
  key: Joi.string().trim().required(),
});