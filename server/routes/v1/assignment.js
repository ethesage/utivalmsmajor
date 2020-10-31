import express from 'express';
import 'express-async-errors';
import {
  submitAssignment,
  gradeStudentAssignment,
  editSubmittedAssignment,
  deleteAssignment,
  createAssignmentComment,
  editAssignmentComment,
  getAssignmentComment,
  deleteAssignmentComment,
  getStudentCourseCohortAssignment,
  getStudentSubmitClassAssignment,
  getAllSubmitClassAssignment,
} from '../../controllers/assignment';
import middlewares from '../../middlewares';

const {
  validate,
  submitAssignmentSchema,
  gradeAssignmentSchema,
  deleteAssignmentSchema,
  editAssignmentSchema,
  assignmentCommentSchema,
  getCommentSchema,
  editCommentSchema,
  deleteCommentSchema,
  getStudentCourseCohortAssignmentSchema,
  getStudentSubmitClassAssignmentSchema,
  usession,
} = middlewares;

const assignmentRoutes = express();

assignmentRoutes.post(
  '/submit',
  usession.can(''),
  validate(submitAssignmentSchema),
  submitAssignment
);

assignmentRoutes.patch(
  '/grade',
  usession.can(''),
  validate(gradeAssignmentSchema),
  gradeStudentAssignment
);

assignmentRoutes.patch(
  '/edit/:assignmentId',
  usession.can(''),
  validate(editAssignmentSchema),
  editSubmittedAssignment
);

assignmentRoutes.delete(
  '/:assignmentId',
  usession.can(''),
  validate(deleteAssignmentSchema),
  deleteAssignment
);

assignmentRoutes.post(
  '/comment/:assignmentId',
  usession.can(''),
  validate(assignmentCommentSchema),
  createAssignmentComment
);

assignmentRoutes.get(
  '/comment/:assignmentId',
  usession.can(''),
  validate(getCommentSchema),
  getAssignmentComment
);

assignmentRoutes.get(
  '/class/student/:classId',
  usession.can(''),
  validate(getStudentSubmitClassAssignmentSchema),
  getStudentSubmitClassAssignment
);

assignmentRoutes.get(
  '/class/submitted/all/:classId',
  usession.can(''),
  validate(getStudentSubmitClassAssignmentSchema),
  getAllSubmitClassAssignment
);

assignmentRoutes.get(
  '/cohort/student/:courseCohortId',
  usession.can(''),
  validate(getStudentCourseCohortAssignmentSchema),
  getStudentCourseCohortAssignment
);

assignmentRoutes.patch(
  '/comment/:assignmentCommentId',
  usession.can(''),
  validate(editCommentSchema),
  editAssignmentComment
);

assignmentRoutes.delete(
  '/comment/:assignmentCommentId',
  usession.can(''),
  validate(deleteCommentSchema),
  deleteAssignmentComment
);

export default assignmentRoutes;
