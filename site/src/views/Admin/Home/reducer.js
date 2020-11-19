export const initialState = {
  dashboard: null,
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

    case 'GET_ADMIN_DASHBOARD':
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
};

export default course;
