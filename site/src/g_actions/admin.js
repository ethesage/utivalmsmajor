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

export const getAllCourseCohorts = (id, name) => async (dispatch) => {
  const cohorts = await axiosInstance.get(`/admin/course-cohorts/${id}`);

  dispatch({
    type: 'GET_ALL_COURSE_COHORTS',
    payload: { cohort: cohorts.data.data, name },
  });
};

export const addCourseCohort = (course, name) => async (dispatch) => {
  dispatch({
    type: 'ADD_COURSE_COHORT',
    payload: { cohort: course, name },
  });
};

export const addClass = (newClass, name) => async (dispatch) => {
  dispatch({
    type: 'ADD_CLASS',
    payload: { newClass, name },
  });
};

export const editClass = (newClass, name) => async (dispatch) => {
  dispatch({
    type: 'EDIT_CLASS',
    payload: { newClass, name },
  });
};

export const addCourseDescription = (data, name) => async (dispatch) => {
  dispatch({
    type: 'ADD_COURSE_DESCRIPTION',
    payload: { courseDescription: data, name },
  });
};

export const updateCourseDescription = (data, name) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_COURSE_DESCRIPTION',
    payload: { courseDescription: data, name },
  });
};

export const getCurrentCourseCohort = (courseCohortId, name) => async (
  dispatch
) => {
  let courses;

  courses = await axiosInstance.get(`/admin/course-cohort/${courseCohortId}`);

  const useObject = courses.data.data;

  const data_ = useObject?.Classes.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.title]: {
        files: null,
        assignment: null,
        submittedAssignment: null,
        allSubmittedAssignment: null,
      },
    }),
    {}
  );

  if (data_) {
    dispatch({
      type: 'CREATE_CLASS_RESOURCES',
      payload: data_,
    });
  }

  // create a list of the class name so we can add the class resources
  dispatch({
    type: 'ADD_CURRENT_COHORT',
    payload: { courseCohort: courses.data.data, name },
  });
};
