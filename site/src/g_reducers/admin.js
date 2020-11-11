export const initialState = {
  allCourses: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ORIGINAL_COURSES':
      return {
        ...state,
        allCourses: action.payload,
      };

    default:
      return state;
  }
};

export default course;
