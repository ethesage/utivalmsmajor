import express from "express";
import "express-async-errors";
import { quickCheckout, checkStatus } from "../../controllers/quickCheckout";
import middlewares from "../../middlewares";

const {
  validate,
  checkoutSchema,
  usession,
} = middlewares;

const checkoutRoute = express();

checkoutRoute.post(
  "/quickcheckout/:courseCohortId",
  // usession.can('course:crud'),
  validate(checkoutSchema),
  quickCheckout
);

checkoutRoute.get(
  "/checkstatus/:courseCohortId",
  usession.can(""),
  validate(checkoutSchema),
  checkStatus
);

export default checkoutRoute;
