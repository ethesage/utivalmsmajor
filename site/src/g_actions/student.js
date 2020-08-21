import { axiosInstance } from '../helpers';

export const getEnrolledCourses = () => async (dispatch) => {
  let courses;
  try {
    courses = await axiosInstance.get(`/student`);
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_ENROLLED_COURSES',
    payload: courses.data.data,
  });
};
