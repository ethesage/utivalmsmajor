import express from 'express';
import 'express-async-errors';
import {
  createClass,
  // getAllClass,
  getClass,
  updateClass,
  deleteClass,
  getAllStudentClass,
  classAssignment,
  editClassAssignment,
  deleteClassAssignment,
  addClassResources,
} from '../../controllers/class';
import middlewares from '../../middlewares';

const {
  validate,
  getClassAssignmentSchema,
  deleteClassAssignmentSchema,
  editClassAssignmentSchema,
  createClassAssignmentSchema,
  //   getclassRoomSchema,
  //   getAllclassRoomSchema,
  createClassroom,
  usession,
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

classRoutes.post(
  '/assignment/:classId',
  usession.can(''),
  validate(createClassAssignmentSchema),
  classAssignment
);

classRoutes.post(
  '/resource/:classId',
  usession.can(''),
  validate(getClassAssignmentSchema),
  addClassResources
);

classRoutes.patch(
  '/assignment/edit/:classResourceId',
  usession.can('trainer'),
  validate(editClassAssignmentSchema),
  editClassAssignment
);

classRoutes.delete(
  '/assignment/:classResourcesId',
  usession.can(''),
  validate(deleteClassAssignmentSchema),
  deleteClassAssignment
);

export default classRoutes;
