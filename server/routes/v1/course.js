import express from 'express';
import 'express-async-errors';
import {
  create,
  getCourse,
  getAllCourses,
  updateCourse,
  updateCourseDescription,
  deleteCourse,
  getAllCoursesAdmin,
  Courses
} from '../../controllers/course';
import middlewares from '../../middlewares';

const {
  validate,
  createCourse,
  getCourseSchema,
  getAllCourseSchema,
  getCourseDescriptionSchema,
  usession
} = middlewares;

const courseRoutes = express();

courseRoutes.post(
  '/create',
  usession.can('course:crud'),
  validate(createCourse),
  create
);

courseRoutes.get(
  '/view',
  usession.can(''),
  validate(getAllCourseSchema),
  getAllCourses
);

courseRoutes.get(
  '/main',
  // usession.can(''),
  validate(getAllCourseSchema),
  Courses
);

courseRoutes.get(
  '/admin/view',
  usession.can(''),
  // validate(getAllCourseSchema),
  getAllCoursesAdmin
);

courseRoutes.get(
  '/view/:courseId',
  usession.can(''),
  validate(getCourseSchema),
  getCourse
);

courseRoutes.patch(
  '/update/:courseId',
  usession.can('course:crud'),
  validate(getCourseSchema),
  updateCourse
);

courseRoutes.patch(
  '/update/description/:courseDescriptionId',
  usession.can('course:crud'),
  validate(getCourseDescriptionSchema),
  updateCourseDescription
);

courseRoutes.delete(
  '/:courseId',
  usession.can('course:crud'),
  validate(getCourseSchema),
  deleteCourse
);

export default courseRoutes;
