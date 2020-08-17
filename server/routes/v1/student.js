import express from 'express';
import 'express-async-errors';
import {
  addStudentCourse,
  getAllStudentCourse,
  getSingleStudentCourse,
  getStudentDashboard,
} from '../../controllers/student';
import middlewares from '../../middlewares';

const {
  validate,
  addStudentSchema,
  getStudentSchema,
  //   coursestudentSchema,
  //   studentSchema,
  //   updatestudentSchema,
  usession
} = middlewares;

const studentRoutes = express();

studentRoutes.post(
  '/create',
  usession.can('course:crud'),
  validate(addStudentSchema),
  addStudentCourse
);

studentRoutes.get(
  '/:studentCourseId',
  usession.can(''),
  validate(getStudentSchema),
  getSingleStudentCourse
);

studentRoutes.get(
  '/dashboard',
  usession.can(''),
  getStudentDashboard
);

studentRoutes.get(
  '/',
  usession.can(''),
  getAllStudentCourse
);

// studentRoutes.patch(
//   '/:studentId',
//   usession.can('course:crud'),
//   validate(updatestudentSchema),
//   updatestudent
// );

// studentRoutes.delete(
//   '/:studentId',
//   usession.can('course:crud'),
//   validate(studentSchema),
//   deletestudent
// );

export default studentRoutes;
