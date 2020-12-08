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
    course = await axiosInstance.get('/trainer/all/nextclass');
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_NEXT_COURSES',
    payload: course.data.data,
  });
};

export const getCourse = (page, link) => async (dispatch) => {
  let allCourses;
  try {
    allCourses = await axiosInstance.get(
      `/course${link}?currentPage=${page}&pageLimit=10`
    );
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'GET_ALl_ONGOING_COURSES',
    payload: allCourses.data.data,
  });
};

export const mapCourse = (courses) => async (dispatch) => {
  // console.log(courses, '...//')
  dispatch({
    type: 'MAP_COURSES',
    payload: courses,
  });
};
