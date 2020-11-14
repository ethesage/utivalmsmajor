import { axiosInstance } from '../helpers';

export const getAllcourses = () => async (dispatch) => {
  const courses = await axiosInstance.get('/admin/courses');

  dispatch({
    type: 'GET_ALL_ORIGINAL_COURSES',
    payload: courses.data.data,
  });
};

export const addCourse = (course) => async (dispatch) => {
  dispatch({
    type: 'ADD_COURSE',
    payload: course,
  });
};

export const editCourse = (course) => async (dispatch) => {
  dispatch({
    type: 'EDIT_COURSE',
    payload: course,
  });
};

export const getCurrentCourse = (course, id) => async (dispatch) => {
  const currCourse = course
    ? course
    : await axiosInstance.get(`/admin/course/${id}`);

  dispatch({
    type: 'GET_CURRENT_COURSE',
    payload: course ? currCourse : currCourse.data.data,
  });
};

export const getAllCourseCohorts = (id) => async (dispatch) => {
  const cohorts = await axiosInstance.get(`/admin/course-cohorts/${id}`);

  dispatch({
    type: 'GET_ALL_COURSE_COHORTS',
    payload: cohorts.data.data,
  });
};

export const addCourseCohort = (course) => async (dispatch) => {
  dispatch({
    type: 'ADD_COURSE_COHORT',
    payload: course,
  });
};

export const getCourseCohort = (course, id) => async (dispatch) => {
  const currCourse = course
    ? course
    : await axiosInstance.get(`/admin/course/${id}`);

  dispatch({
    type: 'GET_CURRENT_COURSE',
    payload: course ? currCourse : currCourse.data.data,
  });
};
