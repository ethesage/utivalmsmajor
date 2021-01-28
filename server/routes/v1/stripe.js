import express from "express";
import "express-async-errors";
import { createSession, retrieveSession } from "../../controllers/stripe";
import middlewares from "../../middlewares";

const { usession } = middlewares;

const stripeRoutes = express();

stripeRoutes.post(
  "/create-checkout-session",
  usession.can(""),
  // validate(createFileSchema),
  createSession
);

stripeRoutes.get(
  "/retrieve-checkout-session",
  // usession.can(""),
  // validate(createFileSchema),
  retrieveSession
);

export default stripeRoutes;
