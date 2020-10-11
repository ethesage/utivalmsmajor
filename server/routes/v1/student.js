import express from 'express';
import 'express-async-errors';
import {
  addStudentCourse,
  getAllStudentCourse,
  getSingleStudentCourse,
  getStudentDashboard,
  allCourseStudents,
  getStudentNextClass,
  getStudentClassDays,
} from '../../controllers/student';
import middlewares from '../../middlewares';

const {
  validate,
  addStudentSchema,
  getStudentSchema,
  // getStudentCourseSchema,
  //   coursestudentSchema,
  //   studentSchema,
  //   updatestudentSchema,
  usession,
} = middlewares;

const studentRoutes = express();

studentRoutes.post(
  '/create',
  // usession.can('course:crud'),
  validate(addStudentSchema),
  addStudentCourse
);

studentRoutes.get(
  '/:courseCohortId',
  usession.can(''),
  validate(getStudentSchema),
  getSingleStudentCourse
);

studentRoutes.get('/all/dashboard', usession.can(''), getStudentDashboard);

studentRoutes.get('/', usession.can(''), getAllStudentCourse);

studentRoutes.get(
  '/allstudents/:courseCohortId',
  usession.can(''),
  validate(getStudentSchema),
  allCourseStudents
);

studentRoutes.get('/all/nextclass', usession.can(''), getStudentNextClass);

studentRoutes.get(
  '/classdays/:courseCohortId',
  usession.can(''),
  validate(getStudentSchema),
  getStudentClassDays
);

// studentRoutes.delete(
//   '/:studentId',
//   usession.can('course:crud'),
//   validate(studentSchema),
//   deletestudent
// );

export default studentRoutes;
