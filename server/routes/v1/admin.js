import express from 'express';
import 'express-async-errors';
import {
  getAdminDashboard,
  getAllCourses,
  getCourseCatnames,
  getCourse,
  getAllCourseCohorts,
  getCourseCohort,
  getAllTrainers,
  deleteStudent,
  addpreviousVideo,
  removepreviousVideo,
} from '../../controllers/admin';
import middlewares from '../../middlewares';

const {
  validate,
  idSchema,
  deleteStudentSchema,
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

adminRoutes.post(
  '/add-prev-videos',
  usession.can('class:crud'),
  addpreviousVideo
);

adminRoutes.delete(
  '/prev-videos/:id',
  usession.can('class:crud'),
  removepreviousVideo
);

adminRoutes.get('/courses', usession.can('course:crud'), getAllCourses);

adminRoutes.get(
  '/course/:id',
  usession.can('course:crud'),
  validate(idSchema),
  getCourse
);
adminRoutes.get('/cat-names', getCourseCatnames);

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

adminRoutes.get('/users/:role', usession.can(''), getAllTrainers);

adminRoutes.patch(
  '/delete-student',
  usession.can('student_remove'),
  validate(deleteStudentSchema),
  deleteStudent
);

export default adminRoutes;
