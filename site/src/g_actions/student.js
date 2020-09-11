import { axiosInstance } from '../helpers';

export const getEnrolledCourses = (id, data) => async (dispatch) => {
  let courses;
  try {
    courses = data
      ? data
      : await axiosInstance.get(`/student${id ? `/${id}` : ''}`);
  } catch (error) {
    return error;
  }

  dispatch({
    type: id ? 'GET_CURRENT_COURSE' : 'GET_ENROLLED_COURSES',
    payload: data ? courses : courses.data.data,
  });
};

export const getEnrolledMembers = (id, data) => async (dispatch) => {
  let members;
  try {
    members = await axiosInstance.get(`/student/allstudents/${id}`);
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_ALL_ENROLLED_STUDENTS',
    payload: members.data.data,
  });
};

export const getClassDays = (id) => async (dispatch) => {
  let classdays;
  try {
    classdays = await axiosInstance.get(`/student/classdays/${id}`);
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_ALL_CLASS_DAYS',
    payload: classdays.data.data,
  });
};