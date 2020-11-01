import { axiosInstance } from "../helpers";

export const loading = () => async (dispatch) => {
  dispatch({
    type: "LOADING_ARTICLES",
    payload: true,
  });
};

export const done_loading = () => async (dispatch) => {
  dispatch({
    type: "DONE_LOADING_ARTICLE",
    payload: false,
  });
};

export const getcategories = () => async (dispatch) => {
  let categories;
  try {
    categories = await axiosInstance.get("/category");
  } catch (error) {
    return error;
  }

  dispatch({
    type: "GET_CATEGORIES",
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
    type: "GET_CURRENT_COURSE",
    payload: course.data.course,
  });
};

export const getAllCourses = (page) => async (dispatch) => {
  let course;
  try {
    course = await axiosInstance.get(
      `/course/view?pageLimit=10&currentPage=${page}`
    );
  } catch (error) {
    return error;
  }

  dispatch({
    type: "GET_ALL_COURSES",
    payload: course.data.course,
  });
};

export const check = (courseCohortId) => async (dispatch) => {
  let isCheck;
  try {
    isCheck = await axiosInstance.get(
      `/checkout/checkstatus/${courseCohortId}`
    );
  } catch (error) {
    return error;
  }
  return isCheck.data.data;
};

export const checkout = (courseCohortId) => async (dispatch) => {
  let checkout;
  try {
    checkout = await axiosInstance.post(
      `/checkout/quickcheckout/${courseCohortId}`
    );
  } catch (error) {
    return error;
  }
  return checkout;
};

export const checkoutCourse = (course) => async (dispatch) => {
  // console.log(course, '...//')
  dispatch({
    type: 'CHECKOUT',
    payload: course,
  });
};