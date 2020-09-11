import express from 'express';
import 'express-async-errors';
import {
    submitAssignment,
    gradeStudentAssignment,
    editSubmittedAssignment,
    deleteAssignment
} from '../../controllers/assignment';
import middlewares from '../../middlewares';

const {
    validate,
    submitAssignmentSchema,
    gradeAssignmentSchema,
    deleteAssignmentSchema,
    editAssignmentSchema,
    usession
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

// assignmentRoutes.get(
//   '/coursecohort/:coursecohortId',
//   usession.can(''),
//   // validate(getclassRoomSchema),
//   getClass
// );

// assignmentRoutes.get(
//   '/student',
//   usession.can(''),
//   // validate(getclassRoomSchema),
//   getAllStudentClass
// );


// assignmentRoutes.patch(
//   '/update/:classId',
//   usession.can('classRoom:crud'),
//   // validate(getclassRoomSchema),
//   updateClass
// );

// assignmentRoutes.delete(
//   '/:classId',
//   usession.can('classRoom:crud'),
//   // validate(getclassRoomSchema),
//   deleteClass
// );

// assignmentRoutes.post(
//   '/assignment/:classId',
//   usession.can(''),
//   validate(getClassAssignmentSchema),
//   classAssignment
// );

export default assignmentRoutes;
