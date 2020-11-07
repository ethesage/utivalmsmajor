export const initialState = {
  categories: null,
  currentCourse: null,
  nextclasses: null,
  allCourses: null,
  mappedCourses: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: (state.categories = action.payload),
      };
    case 'GET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
      };
    case 'GET_NEXT_COURSES':
      return {
        ...state,
        nextclasses: action.payload,
      };
    case 'GET_ALl_ONGOING_COURSES':
      return {
        ...state,
        allCourses: action.payload,
      };
    case 'MAP_COURSES':
      return {
        ...state,
        mappedCourses: action.payload,
      };
    case 'ADD_STUDENT_COURSE':
      const updated = state.mappedCourses.map((course) => {
        if (course.courseCohortId === action.payload.courseCohortId) {
          return { ...course, studentCourse: action.payload.studentCourse };
        }
        return null;
      });
      return {
        ...state,
        mappedCourses: updated,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default course;
