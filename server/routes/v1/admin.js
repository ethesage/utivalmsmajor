import express from 'express';
import 'express-async-errors';
import {
  getAdminDashboard,
  getAllCourses,
  getCourseCatnames,
  getCourse,
  getAllCourseCohorts,
  getCourseCohort,
} from '../../controllers/admin';
import middlewares from '../../middlewares';

const {
  validate,
  idSchema,
  //   addStudentSchema,
  //   getStudentSchema,
  // getStudentCourseSchema,
  //   coursestudentSchema,
  //   studentSchema,
  //   updatestudentSchema,
  usession,
} = middlewares;

const adminRoutes = express();

// adminRoutes.post(
//   '/create',
//   usession.can('course:crud'),
//   validate(addStudentSchema),
//   addStudentCourse
// );

// adminRoutes.get(
//   '/:studentCourseId',
//   usession.can(''),
//   validate(getStudentSchema),
//   getSingleStudentCourse
// );

adminRoutes.get('/dashboard', usession.can('course:crud'), getAdminDashboard);

adminRoutes.get('/courses', usession.can('course:crud'), getAllCourses);
adminRoutes.get(
  '/course/:id',
  usession.can('course:crud'),
  validate(idSchema),
  getCourse
);
adminRoutes.get('/cat-names', usession.can('course:crud'), getCourseCatnames);

adminRoutes.get(
  '/course-cohorts/:id',
  usession.can(''),
  validate(idSchema),
  getAllCourseCohorts
);

adminRoutes.get(
  '/course-cohort/:id',
  usession.can(''),
  validate(idSchema),
  getCourseCohort
);

// adminRoutes.get(
//   '/allstudents/:studentCourseId',
//   usession.can(''),
//   validate(getStudentSchema),
//   allCourseStudents
// );

// adminRoutes.get('/all/nextclass', usession.can(''), getStudentNextClass);

// adminRoutes.get(
//   '/classdays/:studentCourseId',
//   usession.can(''),
//   validate(getStudentSchema),
//   getStudentClassDays
// );

// adminRoutes.delete(
//   '/:studentId',
//   usession.can('course:crud'),
//   validate(studentSchema),
//   deletestudent
// );

export default adminRoutes;
