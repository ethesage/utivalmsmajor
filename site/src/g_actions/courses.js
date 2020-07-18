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
