import express from "express";
import "express-async-errors";
import user from "./user";
import course from "./course";
import trainer from "./trainer";
import student from "./student";
import classRoom from "./class";
import file from "./file";
import cohort from "./cohort";
import assignment from "./assignment";
import admin from "./admin";
import checkout from "./checkout";
import helpers from "../../helpers";

const { errorStat, successStat } = helpers;

const router = express.Router();

router.get("/logout", async (req, res) => {
  await req.session.logout(res);
  successStat(res, 200, "message", "successfully logout");
});

router.get("/logged-in", async (req, res) => {
  try {
    await req.session.isLoggedIn(req, res);
  } catch (err) {
    return errorStat(res, 401, err.message);
  }
  successStat(res, 200, "message", "logged in");
});

router.use("/user", user);
router.use("/course", course);
router.use("/trainer", trainer);
router.use("/student", student);
router.use("/class", classRoom);
router.use("/file", file);
router.use("/cohort", cohort);
router.use("/assignment", assignment);
router.use("/admin", admin);
router.use("/checkout", checkout);

export default router;
