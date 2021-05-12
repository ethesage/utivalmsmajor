import { axiosInstance } from '../helpers';

export const getEnrolledCourses = (
  id,
  data,
  userType = 'student',
  user
) => async (dispatch) => {
  let courses;

  const slug = userType === 'student' ? userType : 'trainer/course';
  const courseId = id ? `/${id}` : '';

  courses = data ? data : await axiosInstance.get(`/${slug}${courseId}`);

  if (id) {
    const useObject = data ? data : courses.data.data;

    const matArray = await Promise.all(
      useObject.Course.Classes.map(async (cls) => {
        const resources = await axiosInstance.get(
          `/file?key=${encodeURIComponent(
            `Courses/${useObject.Course.name}/classes/${cls.title}/resources/`
          )}`
        );

        const assignments = await axiosInstance.get(
          `/file?key=${encodeURIComponent(
            `Courses/${useObject.Course.name}/classes/${cls.title}/assignments/`
          )}`
        );

        return {
          [cls.title]: {
            resources: resources.data.data,
            assignments: assignments.data.data,
            submittedAssignment: null,
            allSubmittedAssignment: null,
          },
        };

        //
      })
    );

    const data_ = await matArray.reduce((acc, cur) => ({ ...acc, ...cur }), {});

    dispatch({
      type: 'CREATE_CLASS_RESOURCES',
      payload: data_,
    });
  }

  // create a list of the class name so we can add the class resources
  dispatch({
    type: id ? 'GET_CURRENT_COURSE_MEMBER' : 'GET_ENROLLED_COURSES',
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
    payload: { members: members.data.data, courseId: id },
  });
};

export const enrollStudents = (data) => async (dispatch) => {
  dispatch({
    type: 'ENROLL_STUDENTS',
    payload: data,
  });
};

export const deleteStudent = (id) => async (dispatch) => {
  dispatch({
    type: 'REMOVE_STUDENT',
    payload: id,
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

export const deleteResources = (name, file) => async (dispatch) => {
  dispatch({
    type: 'DELETE_RESOURCE',
    payload: { name, file },
  });
};

export const updateResourceName = (oldname, newname) => (dispatch) => {
  dispatch({
    type: 'UPDATE_RESOURCE_NAME',
    payload: { oldname, newname },
  });
};

export const createResourceName = (name) => (dispatch) => {
  dispatch({
    type: 'CREATE_RESOURCE_NAME',
    payload: name,
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

export const getStudentSubmittedAssignments = (
  name,
  classId,
  courseCohortId,
  CourseName,
  CohortName,
  user
) => async (dispatch) => {
  const response = await axiosInstance.get(
    `assignment/class/student/${classId}/${courseCohortId}`
  );

  dispatch({
    type: 'GET_STUDENT_ASSIGNMENT',
    payload: {
      name,
      data: response.data.data.map((res) => ({
        ...res,
        Key: `Courses/${CourseName}/cohorts/${CohortName}/submitted-assignments/${user.id}/${res.resourceLink}`,
        Size: res.size,
      })),
    },
  });
};

export const updateSubmittedAssignments = (name, file) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_SUBMITTED_ASSIGNMENT',
    payload: { name, file },
  });
};

export const deleteSubmittedAssignment = (name, id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_SUBMITTED_ASSIGNMENT',
    payload: { name, id },
  });
};

export const getAllsubmittedAssignment = (
  name,
  classId,
  cohortId,
  courseName,
  cohortName
) => async (dispatch) => {
  const response = await axiosInstance.get(
    `/assignment/class/submitted/all/${classId}/${cohortId}`
  );

  dispatch({
    type: 'GET_ALL_SUBMITTED_ASSIGNMENTS',
    payload: {
      name,
      data: response.data.data.map((res) => ({
        ...res,
        Key: `Courses/${courseName}/cohorts/${cohortName}/submitted-assignments/${res.studentId}/${res.resourceLink}`,
        Size: res.size,
      })),
    },
  });
};

export const gradeAssignment = (name, Id, grade) => async (dispatch) => {
  dispatch({
    type: 'GRADE_ASSIGNMENT',
    payload: { name, Id, grade },
  });
};

export const studentProgress = (courseCohortId, classId) => async (
  dispatch
) => {
  let members;
  const data = {
    courseCohortId,
    classId,
  };

  try {
    members = await axiosInstance.post('/student/addprogress', data);

    return members.data;
  } catch (error) {
    return error;
  }
};

export const courseProgress = (courseCohortId, classId) => async (dispatch) => {
  let members;
  const data = {
    courseCohortId,
    classId,
  };
  try {
    members = await axiosInstance.post('/course/addprogress', data);

    return members.data;
  } catch (error) {
    return error;
  }
};
