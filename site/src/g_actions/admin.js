import { axiosInstance } from '../helpers';

export const getAllcourses = () => async (dispatch) => {
  const courses = await axiosInstance.get('/admin/courses');

  dispatch({
    type: 'GET_ALL_ORIGINAL_COURSES',
    payload: courses.data.data,
  });
};
