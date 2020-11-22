import { axiosInstance } from '../helpers';

export const getcategories = () => async (dispatch) => {
  const categories = await axiosInstance.get('/admin/cat-names');

  dispatch({
    type: 'GET_CATEGORIES',
    payload: categories.data.data.categories.sort((a, b) => {
      if (a.name.split(' ')[0] < b.name.split(' ')[0]) {
        return -1;
      }
      return 1;
    }),
  });
};

export const getSingleCourse = (slug) => async (dispatch) => {
  let course;
  try {
    course = await axiosInstance.get(`/course/view/${slug}`);
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_CURRENT_COURSE',
    payload: course.data.course,
  });
};

export const getNextClasses = () => async (dispatch) => {
  let course;
  try {
    course = await axiosInstance.get('/student/all/nextclass');
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_NEXT_COURSES',
    payload: course.data.data,
  });
};

export const getCourse = (page, link, category) => async (dispatch) => {
  let allCourses;
  try {
    allCourses = await axiosInstance.get(
      `/course${link}?currentPage=${page}&pageLimit=10&category=${category}`
    );
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_ALl_ONGOING_COURSES',
    payload: { category, data: allCourses.data.data.rows },
  });
};

export const mapCourse = (courses, category) => async (dispatch) => {
  // console.log(courses, '...//')
  dispatch({
    type: 'MAP_COURSES',
    payload: { category, data: courses },
  });
};

export const addStudentCourse = (courseCohortId, studentCourse) => async (
  dispatch
) => {
  dispatch({
    type: 'ADD_STUDENT_COURSE',
    payload: { studentCourse, courseCohortId },
  });
};
