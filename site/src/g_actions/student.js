import { axiosInstance } from '../helpers';

export const getEnrolledCourses = (id, data) => async (dispatch) => {
  let courses;
  try {
    courses = data
      ? data
      : await axiosInstance.get(`/student${id ? `/${id}` : ''}`);
  } catch (error) {
    return error;
    courses = [];
  }

  dispatch({
    type: id ? 'GET_CURRENT_COURSE' : 'GET_ENROLLED_COURSES',
    payload: data ? courses : courses.data.data,
  });
};
