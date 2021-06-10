import express from "express";
import "express-async-errors";
import { addTransction } from "../../controllers/transaction";
import middlewares from "../../middlewares";

const {
  validate,
  transactionSchema,
  usession,
} = middlewares;

const transactionRoute = express();

transactionRoute.post(
  "/addtransaction",
  // usession.can(''),
  validate(transactionSchema),
  addTransction
);


export default transactionRoute;
