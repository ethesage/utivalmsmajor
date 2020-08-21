import express from 'express';
import 'express-async-errors';
import {
  createClass,
  getAllClass,
  getClass,
  updateClass,
  deleteClass,
  getAllStudentClass
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

classRoutes.get(
  '/coursecohort/:coursecohortId',
  usession.can(''),
  // validate(getclassRoomSchema),
  getClass
);

classRoutes.get(
  '/student',
  usession.can(''),
  // validate(getclassRoomSchema),
  getAllStudentClass
);


classRoutes.patch(
  '/update/:classId',
  usession.can('classRoom:crud'),
  // validate(getclassRoomSchema),
  updateClass
);

classRoutes.delete(
  '/:classId',
  usession.can('classRoom:crud'),
  // validate(getclassRoomSchema),
  deleteClass
);

export default classRoutes;
