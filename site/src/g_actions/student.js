import { axiosInstance } from '../helpers';

export const getEnrolledCourses = (id, data) => async (dispatch) => {
  let courses;
  try {
    courses = data
      ? data
      : await axiosInstance.get(`/student${id ? `/${id}` : ''}`);

    if (id) {
      const useObject = data ? data : courses.data.data;

      const data_ = useObject.CourseCohort.Classes.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.title]: { files: [], assignment: null },
        }),
        {}
      );

      dispatch({
        type: 'CREATE_CLASS_RESOURCES',
        payload: data_,
      });
    }
  } catch (error) {
    return error;
  }

  // create a list of the class name so we can add the class resources
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

export const countDetails = () => async (dispatch) => {
  let counts;
  try {
    counts = await axiosInstance.get(`/student/all/dashboard`);
  } catch (error) {
    return error;
  }

  dispatch({
    type: 'COUNTS',
    payload: counts.data.data,
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

export const getResources = (name, file) => async (dispatch) => {
  dispatch({
    type: 'GET_RESOURCES',
    payload: { name, file },
  });
};

export const getAssignments = (name, file) => async (dispatch) => {
  dispatch({
    type: 'GET_ASSIGNMENT',
    payload: { name, file },
  });
};
