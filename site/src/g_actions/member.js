import { axiosInstance } from '../helpers';

export const getEnrolledCourses = (id, data, userType = 'student') => async (
  dispatch
) => {
  let courses;

  const slug = userType === 'student' ? userType : 'trainer/course';
  const courseId = id ? `/${id}` : '';

  courses = data ? data : await axiosInstance.get(`/${slug}${courseId}`);

  if (id) {
    const useObject = data ? data : courses.data.data;

    const data_ = useObject.CourseCohort.Classes.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.title]: {
          files: null,
          assignment: null,
          submittedAssignment: null,
          allSubmittedAssignment: null,
        },
      }),
      {}
    );

    dispatch({
      type: 'CREATE_CLASS_RESOURCES',
      payload: data_,
    });
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

export const deleteResources = (name, id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_RESOURCE',
    payload: { name, id },
  });
};

export const getAssignments = (name, file) => async (dispatch) => {
  dispatch({
    type: 'GET_ASSIGNMENT',
    payload: { name, file },
  });
};

export const editAssignments = (name, file, id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_ASSIGNMENT',
    payload: { name, id },
  });

  dispatch({
    type: 'GET_ASSIGNMENT',
    payload: { name, file },
  });
};

export const deleteAssignmnet = (name, id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_ASSIGNMENT',
    payload: { name, id },
  });
};

export const getSubmittedAssignments = (name, file) => async (dispatch) => {
  dispatch({
    type: 'SUBMIT_ASSIGNMENT',
    payload: { name, file },
  });
};

export const deleteSubmittedAssignment = (name, id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_SUBMITTED_ASSIGNMENT',
    payload: { name, id },
  });
};

export const getAllsubmittedAssignment = (name, classId) => async (
  dispatch
) => {
  const res = await axiosInstance.get(
    `/assignment/class/submitted/all/${classId}`
  );

  dispatch({
    type: 'GET_ALL_SUBMITTED_ASSIGNMENTS',
    payload: { name, data: res.data.data },
  });
};

export const gradeAssignment = (name, Id, grade) => async (dispatch) => {
  dispatch({
    type: 'GRADE_ASSIGNMENT',
    payload: { name, Id, grade },
  });
};