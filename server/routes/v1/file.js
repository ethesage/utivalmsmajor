import express from 'express';
import 'express-async-errors';
import {
  createFile,
  getFile,
  getAllFiles,
  updateFile,
  deleteFile
} from '../../controllers/files';
import middlewares from '../../middlewares';

const {
  validate,
  createFileSchema,
  getFileSchema,
  updateFileSchema,
  usession
} = middlewares;

const fileRoutes = express();

fileRoutes.post(
  '/create',
  usession.can(''),
  validate(createFileSchema),
  createFile
);

fileRoutes.get(
  '/:fileId',
  usession.can(''),
  validate(getFileSchema),
  getFile
);

fileRoutes.get(
  '/',
  usession.can(''),
  getAllFiles
);

fileRoutes.patch(
  '/:fileId',
  usession.can(''),
  validate(updateFileSchema),
  updateFile
);

fileRoutes.delete(
  '/:fileId',
  usession.can(''),
  validate(getFileSchema),
  deleteFile
);

export default fileRoutes;
