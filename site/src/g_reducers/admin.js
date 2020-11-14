export const initialState = {
  allCourses: null,
  currentCourse: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ORIGINAL_COURSES':
      return {
        ...state,
        allCourses: action.payload,
      };

    case 'ADD_COURSE':
      return {
        ...state,
        allCourses: state.allCourses
          ? [...state.allCourses, action.payload]
          : [action.payload],
      };

    case 'EDIT_COURSE':
      return {
        ...state,
        allCourses: state.allCourses.map((course) => {
          if (course.id === action.payload.id) {
            return { ...course, ...action.payload };
          }
          return course;
        }),
      };

    case 'GET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default course;
