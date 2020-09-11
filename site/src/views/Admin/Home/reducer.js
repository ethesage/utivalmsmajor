export const initialState = {
  categories: null,
  currentCourse: null,
  nextclasses: null,
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
    default:
      return state;
  }
};

export default course;
