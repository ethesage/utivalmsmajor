/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const createFileSchema = Joi.object().keys({
  link: Joi.string().trim().required(),
  fileType: Joi.string().trim().required(),
  fileSize: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
});

export const getFileSchema = Joi.object().keys({
  fileId: Joi.string().uuid().trim().required(),
});

export const updateFileSchema = Joi.object().keys({
  fileId: Joi.string().uuid().trim().required(),
  name: Joi.string().trim(),
});
