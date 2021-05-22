import { axiosInstance } from '../../../helpers';

export const getcategories = () => async (dispatch) => {
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

export const getNextClasses = (type) => async (dispatch) => {
  let course;
  try {
    course = await axiosInstance.get(`${type}/all/nextclass`);

    dispatch({
      type: 'GET_NEXT_COURSES',
      payload: course.data.data,
    });
  } catch (error) {
    return error;
  }
};

export const getCourse = (page, link) => async (dispatch) => {
  let allCourses;
  try {
    allCourses = await axiosInstance.get(
      `/course${link}?currentPage=${page}&pageLimit=10`
    );

    dispatch({
      type: 'GET_ALl_ONGOING_COURSES',
      payload: allCourses.data.data,
    });
  } catch (error) {
    return error;
  }
};

export const mapCourse = (courses) => async (dispatch) => {
  dispatch({
    type: 'MAP_COURSES',
    payload: courses,
  });
};
