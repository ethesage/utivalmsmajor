/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
import { paginate, calculateLimitAndOffset } from 'paginate-info';
import models from '../database/models';
import helpers from '../helpers';
// import  from "../helpers"

const { successStat, errorStat, uploadImage, createFileFolder } = helpers;

// const { Op, literal } = sequelize;

/**
 * / @static
 * @description Allows a staff to create a course
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */

export const create = async (req, res) => {
  const { courseDescription, name } = req.body.course;

  const { id } = req.session.user;

  const exixtingCourse = await models.Course.findOne({
    where: {
      name: req.body.course.name,
    },
  });

  if (exixtingCourse) {
    return errorStat(res, 409, 'This Course already exists');
  }

  const thumbnail = req.body.course.thumbnail
    ? await uploadImage(
        req.body.course.thumbnail,
        `thumbnail-${req.body.course.name}`
      )
    : null;

  const course = await models.Course.create({
    ...req.body.course,
    trainerId: id,
    thumbnail: thumbnail && thumbnail.Location,
  });

  let resource = [];

  if (courseDescription) {
    const descVals = courseDescription.map((desc) => ({
      title: desc.title,
      description: desc.description,
      trainerId: id,
      courseId: course.id,
    }));

    resource = await models.CourseDescription.bulkCreate(descVals, {
      ignoreDuplicates: true,
    });
  }

  await createFileFolder(`Course/${name}/classes/`);

  return successStat(res, 201, 'data', {
    course,
    courseDescription: resource,
  });
};

// export const addCourseClass = async (req, res) => {
//   const { classId, courseCohortId } = req.body.course;

//   //   const { id } = req.session.user;

//   try {
//     const course = await models.Class.findOne({
//       where: { id: classId }
//     });

//     if (!course) return errorStat(res, 404, 'Course does not exist');

//     const courseCohort = await models.CourseCohort.findOne({
//       where: { courseId, cohortId }
//     });

//     if (!courseCohort) return errorStat(res, 404, 'Course already exist in this cohort');

//     const createCohortCourse = await models.CourseCohort.create({
//       ...req.body.cohort,
//       status: 'ongoing',
//     });

//     return successStat(res, 201, 'data', createCohortCourse);
//   } catch (e) {
//     console.log(e);
//     errorStat(res, 500, 'Operation Failed, Please Try Again');
//   }
// };

export const getCourse = async (req, res) => {
  const { courseId } = req.body.course;

  const course = await models.Course.findOne({
    where: { id: courseId },
    include: [
      {
        model: models.CourseDescription,
        attributes: ['id', 'courseId', 'title', 'description', 'trainerId'],
      },
      {
        model: models.Cohort,
        where: { courseId },
        order: [['createdAt', 'DESC']],
        limit: 1,
        attributes: [
          'id',
          'courseId',
          'cohort',
          'expiresAt',
          'dateRange',
          'status',
          'totalStudent',
          'totalClasses',
        ],
      },
    ],
  });

  if (!course) return errorStat(res, 404, 'Course Not Found');

  return successStat(res, 200, 'data', course);
};

export const getAllCourses = async (req, res) => {
  const { pageLimit, currentPage } = req.body.course;
  const { offset, limit } = calculateLimitAndOffset(currentPage, pageLimit);
  const { id } = req.session.user;

  const sqlQueryMap = {
    offset,
    limit,
  };

  const { rows, count } = await models.Course.findAndCountAll({
    ...sqlQueryMap,
    include: [
      {
        model: models.CourseDescription,
        attributes: ['id', 'courseId', 'title', 'description', 'trainerId'],
      },
      {
        model: models.CourseCohort,
        required: false,
        order: [['createdAt', 'DESC']],
        limit: 1,
        attributes: [
          'id',
          'courseId',
          // "cohort",
          'expiresAt',
          'dateRange',
          'status',
          'totalStudent',
          'totalClasses',
        ],
      },
      {
        model: models.StudentCourse,
        required: false,
        where: { studentId: id },
        // order: [["createdAt"]],
      },
    ],
  });

  if (!rows[0]) return errorStat(res, 404, 'Course Not Found');

  const paginationMeta = paginate(currentPage, count, rows, pageLimit);

  return successStat(res, 200, 'data', { paginationMeta, rows });
};

export const updateCourse = async (req, res) => {
  const { courseId } = req.body.course;

  let thumbnail;

  const course = await models.Course.findOne({
    where: { id: courseId },
  });

  if (
    req.body.course.thumbnail &&
    !req.body.course.thumbnail.includes('media')
  ) {
    let fileName =
      course.thumbnail &&
      course.thumbnail.split('https://utiva-app.s3.amazonaws.com/media/')[1];

    fileName = fileName || `thumbnail-${req.body.course.name}`;

    const image = await uploadImage(
      req.body.course.thumbnail,
      `media/${fileName}`
    );

    // eslint-disable-next-line prefer-destructuring
    thumbnail = image.Location;
  } else thumbnail = req.body.course.thumbnail;

  if (!course) return errorStat(res, 404, 'Course Description not found');

  await course.update({
    ...req.body.course,
    thumbnail,
  });

  return successStat(res, 200, 'data', course);
};

export const updateCourseDescription = async (req, res) => {
  const { courseDescriptionId } = req.body.course;

  const courseDescription = await models.CourseDescription.findOne({
    where: { id: courseDescriptionId },
  });

  if (!courseDescription) {
    return errorStat(res, 404, 'Course Description not found');
  }

  await courseDescription.update({
    ...req.body.course,
  });

  return successStat(res, 200, 'data', courseDescription);
};

export const deleteCourseDescription = async (req, res) => {
  const { courseDescriptionId } = req.body.course;

  const courseDescription = await models.CourseDescription.findOne({
    where: { id: courseDescriptionId },
  });

  if (!courseDescription) {
    return errorStat(res, 404, 'Course Description not found');
  }

  await courseDescription.destroy();

  return successStat(res, 200, 'message', 'Successfully deleted');
};

export const createCourseDescription = async (req, res) => {
  const courseDescription = await models.CourseDescription.create(
    req.body.course
  );

  return successStat(res, 201, 'data', courseDescription);
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  const course = await models.Course.findOne({
    where: { id: courseId },
  });

  if (!course) {
    return errorStat(res, 404, 'Course not found');
  }

  await course.destroy();

  return successStat(res, 200, 'data', 'Delete Successful');
};

export const getAllCoursesAdmin = async (req, res) => {
  const studentByCourse = await models.sequelize.query(
    `SELECT "Courses"."name", COUNT("studentId") AS 
  value FROM "Courses" LEFT JOIN "StudentCourses" ON "Courses"."id" = "StudentCourses"."courseId" 
  LEFT JOIN "CourseCohorts" ON "Courses"."id" = "CourseCohorts"."courseId" 
 WHERE "Courses"."id" IS NOT NULL GROUP BY "Courses"."id"`
  );

  return successStat(res, 200, 'data', studentByCourse);
};

export const Courses = async (req, res) => {
  const { pageLimit, currentPage, category } = req.body.course;
  const { offset, limit } = calculateLimitAndOffset(currentPage, pageLimit);
  // const id = req?.session?.user?.id ;
  let user;

  if (req.session.user) user = req.session.user.id;

  const sqlQueryMap = {
    offset,
    limit,
  };

  const query = user
    ? [
        {
          model: models.CourseCohort,
          order: [['createdAt', 'DESC']],
          limit: 1,
          attributes: ['id', 'paymentType'],
        },
        {
          model: models.CourseDescription,
          attributes: ['courseId', 'title', 'description'],
        },
        {
          model: models.StudentCourse,
          required: false,
          where: { studentId: user },
        },
      ]
    : [
        {
          model: models.CourseCohort,
          order: [['createdAt', 'DESC']],
          limit: 1,
          attributes: ['id', 'paymentType'],
        },
        {
          model: models.CourseDescription,
          attributes: ['courseId', 'title', 'description'],
        },
      ];

  const { rows, count } = await models.Course.findAndCountAll({
    ...sqlQueryMap,
    where: { category },
    include: [...query],
  });

  // if (!rows[0]) return errorStat(res, 404, "Course Not Found");

  const paginationMeta = paginate(currentPage, count, rows, pageLimit);

  return successStat(res, 200, 'data', { paginationMeta, rows });
};

export const addCourseCohortProgress = async (req, res) => {
  const { courseCohortId, classId } = req.body.course;

  const { id, role } = req.session.user;

  const getClass = await models.CourseProgress.findOne({
    where: { classId, type: 'course' },
  });

  const checkStudent = await models.Classes.findOne({
    where: { courseCohortId, id: classId },
    include: [
      {
        model: models.Trainer,
        where: { userId: id },
      },
    ],
  });

  if (!getClass && !checkStudent && role !== 'admin') {
    return errorStat(res, 400, 'Not Allowed');
  }

  const findclassProgress = await models.CourseProgress.findAll({
    where: { type: 'course', classId },
  });

  let find = 0;
  let count = 0;

  if (!findclassProgress[0]) {
    const course = await models.CourseCohort.findOne({
      where: { id: courseCohortId },
    });

    await models.CourseProgress.create({
      courseCohortId,
      userId: id,
      classId,
      type: 'course',
    });

    find = await models.CourseProgress.findAll({
      where: { type: 'course', courseCohortId },
    });

    count = await models.Classes.findAll({
      where: { courseCohortId },
    });

    await course.update({
      progress: Math.floor((find.length / count.length) * 100),
      status:
        Math.floor((find.length / count.length) * 100) === 100
          ? 'finished'
          : 'ongoing',
    });
  }

  if (Math.floor((find.length / count.length) * 100)) {
    await models.Classes.update({ started: true }, { where: { id: classId } });
  }

  return successStat(res, 200, 'data', 'update successful');
};

export const getCohortCourse = async (req, res) => {
  const { courseCohortId } = req.params;
  const { iscourseUrl } = req.query;
  // const { offset, limit } = calculateLimitAndOffset(currentPage, pageLimit);
  // const id = req?.session?.user?.id ;
  let user;

  if (req.session.user) user = req.session.user.id;

  // const sqlQueryMap = {
  //   offset,
  //   limit,
  // };

  let couseCohortWhereClause = {};
  let couseWhereClause = {};

  if (iscourseUrl) {
    // note that what was sent here was the course in place of the cpursecohortId
    couseWhereClause = {
      where: {
        id: courseCohortId,
      },
    };
  } else {
    couseCohortWhereClause = {
      where: { id: courseCohortId },
    };
  }

  const query = user
    ? [
        {
          model: models.CourseCohort,
          order: [['createdAt', 'DESC']],
          limit: 1,
          ...couseCohortWhereClause,
          attributes: ['id', 'paymentType'],
        },
        {
          model: models.CourseDescription,
          attributes: ['courseId', 'title', 'description'],
        },
        {
          model: models.StudentCourse,
          required: false,
          where: { studentId: user },
        },
      ]
    : [
        {
          model: models.CourseCohort,
          ...couseCohortWhereClause,
          order: [['createdAt', 'DESC']],
          limit: 1,
          attributes: ['id', 'paymentType'],
        },
        {
          model: models.CourseDescription,
          attributes: ['courseId', 'title', 'description'],
        },
      ];

  const rows = await models.Course.findOne({
    // ...sqlQueryMap,
    // where: { category },
    ...couseWhereClause,
    include: [...query],
  });
  // if (!rows[0]) return errorStat(res, 404, "Course Not Found");

  // const paginationMeta = paginate(currentPage, count, rows, pageLimit);

  return successStat(res, 200, 'data', rows);
};
