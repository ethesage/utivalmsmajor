/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
// import sequelize from "sequelize";
import { paginate, calculateLimitAndOffset } from 'paginate-info';
import models from '../database/models';
import helpers from '../helpers';
// import  from "../helpers"

const { successStat, errorStat, uploadImage } = helpers;

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
  const { courseDescription } = req.body.course;

  const { id } = req.session.user;

  const exixtingCourse = await models.Course.findOne({
    where: {
      name: req.body.course.name,
    },
  });

  if (exixtingCourse) {
    return errorStat(res, 409, 'This Course already exists');
  }

  const thumbnail = req.files.thumbnail
    ? await uploadImage(
        req.files.thumbnail,
        `thumbnail-${req.body.course.name}`
      )
    : null;

  try {
    const course = await models.Course.create({
      ...req.body.course,
      trainerId: id,
      thumbnail,
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

    return successStat(res, 201, 'data', {
      course,
      courseDescription: resource,
    });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
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

  try {
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
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllCourses = async (req, res) => {
  const { pageLimit, currentPage } = req.body.course;
  const { offset, limit } = calculateLimitAndOffset(currentPage, pageLimit);
  const { id } = req.session.user;

  const sqlQueryMap = {
    offset,
    limit,
  };

  try {
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
          order: [['createdAt']],
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
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateCourse = async (req, res) => {
  const { courseId } = req.body.course;

  let thumbnail;

  if (req.files.thumbnail && typeof req.files.thumbnail !== 'string') {
    thumbnail = await uploadImage(
      req.files.thumbnail,
      `thumbnail-${req.body.course.name}`
    );
  } else thumbnail = req.files.thumbnail;

  try {
    const course = await models.Course.findOne({
      where: { id: courseId },
    });

    if (!course) return errorStat(res, 404, 'Course Description not found');

    await course.update({
      ...req.body.course,
      thumbnail,
    });

    return successStat(res, 200, 'data', course);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const updateCourseDescription = async (req, res) => {
  const { courseDescriptionId } = req.body.course;

  try {
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
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const createCourseDescription = async (req, res) => {
  const { courseId } = req.body.course;

  try {
    const courseDescription = await models.CourseDescription.create({
      where: { courseId },
      ...req.body.course,
    });

    return successStat(res, 201, 'data', courseDescription);
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.body.course;

  try {
    const course = await models.Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: models.CourseDescription,
        },
        {
          model: models.Cohort,
        },
      ],
    });

    if (!course) {
      return errorStat(res, 404, 'Course not found');
    }

    await course.destroy();

    return successStat(res, 200, 'data', 'Delete Successful');
  } catch (e) {
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const getAllCoursesAdmin = async (req, res) => {
  try {
    const studentByCourse = await models.sequelize.query(
      `SELECT "Courses"."name", COUNT("studentId") AS 
  value FROM "Courses" LEFT JOIN "StudentCourses" ON "Courses"."id" = "StudentCourses"."courseId" 
  LEFT JOIN "CourseCohorts" ON "Courses"."id" = "CourseCohorts"."courseId" 
 WHERE "Courses"."id" IS NOT NULL GROUP BY "Courses"."id"`
    );

    return successStat(res, 200, 'data', studentByCourse);
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};

export const Courses = async (req, res) => {
  const { pageLimit, currentPage } = req.body.course;
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
          model: models.CourseDescription,
          attributes: ['courseId', 'title', 'description'],
        },
        {
          model: models.CourseCohort,
          required: false,
          order: [['createdAt']],
          limit: 1,
          attributes: ['id'],
        },
        {
          model: models.StudentCourse,
          required: false,
          where: { studentId: user },
        },
      ]
    : [
        {
          model: models.CourseDescription,
          attributes: ['courseId', 'title', 'description'],
        },
        {
          model: models.CourseCohort,
          required: false,
          order: [['createdAt']],
          limit: 1,
          attributes: ['id'],
        },
      ];

  try {
    const { rows, count } = await models.Course.findAndCountAll({
      ...sqlQueryMap,
      include: [...query],
    });

    // if (!rows[0]) return errorStat(res, 404, "Course Not Found");

    const paginationMeta = paginate(currentPage, count, rows, pageLimit);

    return successStat(res, 200, 'data', { paginationMeta, rows });
  } catch (e) {
    console.log(e);
    errorStat(res, 500, 'Operation Failed, Please Try Again');
  }
};
