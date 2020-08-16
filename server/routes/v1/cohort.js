import express from 'express';
import 'express-async-errors';
import {
  cohort,
  addCohortCourse,
  getCohort,
  getAllCohort,
  updateCohort,
  updateCourseCohort,
  deleteCohort,
  deleteCourseCohort
} from '../../controllers/cohort';
import middlewares from '../../middlewares';

const {
  validate,
  addcourse,
  // getCourseSchema,
  getAllCourseSchema,
  createCohort,
  updateCohortSchema,
  updateCohorCoursetSchema,
  usession
} = middlewares;

const cohortRoutes = express();

cohortRoutes.post(
  '/create',
  usession.can('course:crud'),
  validate(createCohort),
  cohort
);

cohortRoutes.post(
  '/addcourse',
  usession.can('course:crud'),
  validate(addcourse),
  addCohortCourse
);

cohortRoutes.get(
  '/:cohortId',
  // usession.can('admin:create'),
  // validate(getCohortSchema),
  getCohort
);

cohortRoutes.get(
  '/',
  // usession.can('admin:create'),
  validate(getAllCourseSchema),
  getAllCohort
);

cohortRoutes.patch(
  '/update',
  usession.can('course:crud'),
  validate(updateCohortSchema),
  updateCohort
);

cohortRoutes.patch(
  '/courseCohort/update',
  usession.can('course:crud'),
  validate(updateCohorCoursetSchema),
  updateCourseCohort
);

cohortRoutes.delete(
  '/cohort',
  usession.can('course:crud'),
  // validate(getCohortSchema),
  deleteCohort
);

cohortRoutes.delete(
  '/courseCohort',
  usession.can('course:crud'),
  // validate(getCohortSchema),
  deleteCourseCohort
);

export default cohortRoutes;
