/* eslint-disable import/prefer-default-export */
import Joi from "@hapi/joi";

export const submitAssignmentSchema = Joi.object().keys({
  classResourcesId: Joi.string().uuid().trim().required(),
  classId: Joi.string().uuid().trim().required(),
  resourceLink: Joi.string().trim().required(),
});

export const gradeAssignmentSchema = Joi.object().keys({
  assignmentId: Joi.string().uuid().trim().required(),
  classId: Joi.string().uuid().trim().required(),
  grade: Joi.number().required().max(100),
});

export const editAssignmentSchema = Joi.object().keys({
  assignmentId: Joi.string().uuid().trim().required(),
  resourceLink: Joi.string().trim(),
});

export const deleteAssignmentSchema = Joi.object().keys({
  assignmentId: Joi.string().uuid().trim().required(),
});

export const assignmentCommentSchema = Joi.object().keys({
  assignmentId: Joi.string().uuid().trim().required(),
  comment: Joi.string().trim().required(),
});

export const editCommentSchema = Joi.object().keys({
  assignmentCommentId: Joi.string().uuid().trim().required(),
  comment: Joi.string().trim().required(),
});

export const getCommentSchema = Joi.object().keys({
  assignmentId: Joi.string().uuid().trim().required(),
});

export const deleteCommentSchema = Joi.object().keys({
  assignmentCommentId: Joi.string().uuid().trim().required(),
});

export const getStudentSubmitClassAssignmentSchema = Joi.object().keys({
  classId: Joi.string().uuid().trim().required(),
});

export const getStudentCourseCohortAssignmentSchema = Joi.object().keys({
  courseCohortId: Joi.string().uuid().trim().required(),
});
