import express from 'express';
import 'express-async-errors';
import {
  createClass,
  getAllClass,
  getClass,
  updateClass,
  deleteClass
} from '../../controllers/class';
import middlewares from '../../middlewares';

const {
  validate,
  //   getclassRoomSchema,
  //   getAllclassRoomSchema,
  createClassroom,
  usession
} = middlewares;

const classRoutes = express();

classRoutes.post(
  '/create',
  usession.can('course:crud'),
  validate(createClassroom),
  createClass
);

classRoutes.get(
  '/view/:classId',
  usession.can(''),
  // validate(getAllclassRoomSchema),
  getClass
);

// classRoutes.get(
//   '/view/:classRoomId',
//   // usession.can('admin:create'),
//   validate(getclassRoomSchema),
//   view
// );

// classRoutes.patch(
//   '/update/:classRoomId',
//   usession.can('classRoom:crud'),
//   validate(getclassRoomSchema),
//   update
// );

// classRoutes.delete(
//   '/:classRoomId',
//   usession.can('classRoom:crud'),
//   validate(getclassRoomSchema),
//   deleteclassRoom
// );

export default classRoutes;
