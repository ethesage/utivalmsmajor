import express from 'express';
import 'express-async-errors';
import {
  createFile,
  getFile,
  getAllFiles,
  updateFile,
  deleteFile,
} from '../../controllers/files';
import middlewares from '../../middlewares';

const {
  validate,
  // createFileSchema,
  getFileSchema,
  updateFileSchema,
  // getAllFileSchema,
  usession,
} = middlewares;

const fileRoutes = express();

fileRoutes.post(
  '/create',
  usession.can(''),
  // validate(createFileSchema),
  createFile
);

fileRoutes.get('/:fileId', usession.can(''), validate(getFileSchema), getFile);

fileRoutes.get(
  '/',
  usession.can(''),
  // validate(getAllFileSchema),
  getAllFiles
);

fileRoutes.patch(
  '/:path',
  usession.can(''),
  validate(updateFileSchema),
  updateFile
);

fileRoutes.delete(
  '/',
  usession.can(''),
  // validate(getFileSchema),
  deleteFile
);

export default fileRoutes;
