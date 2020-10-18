import express from "express";
import "express-async-errors";
import {
  createTrainer,
  getAllTrainerCourse,
  // getAllTrainer,
  updateTrainer,
  deleteTrainer,
  getSingleTrainer,
  getSingleTrainerCourse,
} from "../../controllers/trainer";
import middlewares from "../../middlewares";

const {
  validate,
  createTrainerSchema,
  getTrainerSchema,
  courseTrainerSchema,
  trainerSchema,
  updateTrainerSchema,
  usession,
} = middlewares;

const trainerRoutes = express();

trainerRoutes.post(
  "/create",
  usession.can("course:crud"),
  validate(createTrainerSchema),
  createTrainer
);

trainerRoutes.get(
  "/course",
  // usession.can('admin:create'),
  validate(getTrainerSchema),
  getAllTrainerCourse
);

trainerRoutes.get(
  "/course/:courseCohortId",
  // usession.can('admin:create'),
  validate(courseTrainerSchema),
  getSingleTrainerCourse
);

trainerRoutes.get(
  "/:trainerId",
  // usession.can('course:crud'),
  validate(trainerSchema),
  getSingleTrainer
);

trainerRoutes.patch(
  "/:trainerId",
  usession.can("course:crud"),
  validate(updateTrainerSchema),
  updateTrainer
);

trainerRoutes.delete(
  "/:trainerId",
  usession.can("course:crud"),
  validate(trainerSchema),
  deleteTrainer
);

export default trainerRoutes;
