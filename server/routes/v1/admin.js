import express from "express";
import "express-async-errors";
import { getAdminDashboard } from "../../controllers/admin";
import middlewares from "../../middlewares";

const {
//   validate,
  //   addStudentSchema,
  //   getStudentSchema,
  // getStudentCourseSchema,
  //   coursestudentSchema,
  //   studentSchema,
  //   updatestudentSchema,
  usession,
} = middlewares;

const adminRoutes = express();

// adminRoutes.post(
//   '/create',
//   usession.can('course:crud'),
//   validate(addStudentSchema),
//   addStudentCourse
// );

// adminRoutes.get(
//   '/:studentCourseId',
//   usession.can(''),
//   validate(getStudentSchema),
//   getSingleStudentCourse
// );

adminRoutes.get("/dashboard", usession.can("course:crud"), getAdminDashboard);

// adminRoutes.get('/', usession.can(''), getAllStudentCourse);

// adminRoutes.get(
//   '/allstudents/:studentCourseId',
//   usession.can(''),
//   validate(getStudentSchema),
//   allCourseStudents
// );

// adminRoutes.get('/all/nextclass', usession.can(''), getStudentNextClass);

// adminRoutes.get(
//   '/classdays/:studentCourseId',
//   usession.can(''),
//   validate(getStudentSchema),
//   getStudentClassDays
// );

// adminRoutes.delete(
//   '/:studentId',
//   usession.can('course:crud'),
//   validate(studentSchema),
//   deletestudent
// );

export default adminRoutes;
