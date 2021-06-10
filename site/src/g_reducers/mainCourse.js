export const initialState = {
  categories: null,
  currentCourse: null,
  nextclasses: null,
  allCourses: {},
  mappedCourses: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
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
        allCourses: {
          ...state.allCourses,
          [action.payload.category]: action.payload.data,
        },
      };

    case 'ADD_STUDENT_COURSE':
      if (!state.allCourses[action.payload.course.category]) return state;
      const updated = state.allCourses[action.payload.course.category].map(
        (course) => {
          if (
            course.CourseCohorts[0].id ===
            action.payload.course.CourseCohorts[0].id
          ) {
            return { ...course, studentCourse: action.payload.studentCourse };
          }
          return course;
        }
      );
      return {
        ...state,
        allCourses: {
          ...state.allCourses,
          [action.payload.course.category]: updated,
        },
      };

    case 'RESET_HM':
      return {
        ...initialState,
        categories: state.categories,
      };

    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default course;
