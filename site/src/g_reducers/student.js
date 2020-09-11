export const initialState = {
  enrolledcourses: null,
  currentCourse: null,
  enrolledStudents: null,
  classdays: null,
  counts: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ENROLLED_COURSES':
      return {
        ...state,
        enrolledcourses: action.payload,
      };
    case 'GET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
      };
    case 'GET_ALL_ENROLLED_STUDENTS':
      return {
        ...state,
        enrolledStudents: action.payload,
      };
    case 'GET_ALL_CLASS_DAYS':
      return {
        ...state,
        classdays: action.payload,
      };
    case 'COUNTS':
      return {
        ...state,
        counts: action.payload,
      };
    default:
      return state;
  }
};

export default course;
