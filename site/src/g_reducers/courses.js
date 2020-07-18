export const initialState = {
    categories: null,
    currentCourse: null,
  };
  
  const course = (state = initialState, action) => {
    switch (action.type) {
      case "GET_CATEGORIES":
        return {
          ...state,
          categories: (state.categories = action.payload),
        };
      case "GET_CURRENT_COURSE":
        return {
          ...state,
          currentCourse: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default course;
  