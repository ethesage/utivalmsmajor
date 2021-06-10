import { axiosInstance } from '../helpers';

export const getNextClasses = () => async (dispatch) => {
  let categories;
  try {
    categories = await axiosInstance.get('/category');

    dispatch({
      type: 'GET_CATEGORIES',
      payload: categories.data.Categories,
    });
  } catch (error) {
    return error;
  }
};

export const getSingleCourse = (slug) => async (dispatch) => {
  let course;
  try {
    course = await axiosInstance.get(`/course/view/${slug}`);

    dispatch({
      type: 'GET_CURRENT_COURSE',
      payload: course.data.course,
    });
  } catch (error) {
    return error;
  }
};
