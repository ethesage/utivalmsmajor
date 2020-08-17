import usession from './user_session';
import validate from './validators';
import {
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
  changePasswordSchema,
  updateUserSchema,
  quickCheckOutSchema,
  adminCreateSchema
} from './validators/schemas/user';

import {
  createCourse,
  getCourseSchema,
  getAllCourseSchema,
  getCourseDescriptionSchema
} from './validators/schemas/course';

import {
  createTrainerSchema,
  getTrainerSchema,
  courseTrainerSchema,
  trainerSchema,
  updateTrainerSchema
} from './validators/schemas/trainer';

import {
  addStudentSchema,
  getStudentSchema
} from './validators/schemas/student';

import {
  createClassroom
} from './validators/schemas/class';

import {
  createFileSchema,
  getFileSchema,
  updateFileSchema
} from './validators/schemas/files';

import {
  createCohort,
  addcourse,
  updateCohortSchema,
  updateCohorCoursetSchema
} from './validators/schemas/cohort';

import { isLoggedIn } from './auth';
import { checkInvitation } from './checker';

export default {
  usession,
  validate,
  loginSchema,
  signUpSchema,
  updateUserSchema,
  resetPasswordSchema,
  changePasswordSchema,
  isLoggedIn,
  checkInvitation,
  quickCheckOutSchema,
  adminCreateSchema,
  createCourse,
  getCourseSchema,
  getAllCourseSchema,
  createTrainerSchema,
  getTrainerSchema,
  courseTrainerSchema,
  trainerSchema,
  updateTrainerSchema,
  addStudentSchema,
  getStudentSchema,
  createClassroom,
  createFileSchema,
  getFileSchema,
  updateFileSchema,
  createCohort,
  getCourseDescriptionSchema,
  addcourse,
  updateCohortSchema,
  updateCohorCoursetSchema
};
