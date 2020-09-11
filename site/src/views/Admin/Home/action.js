import { axiosInstance } from '../../../helpers';

export const getcategories = () => async (dispatch) => {
  let categories;
  try {
    categories = await axiosInstance.get('/category');
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_CATEGORIES',
    payload: categories.data.Categories,
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
