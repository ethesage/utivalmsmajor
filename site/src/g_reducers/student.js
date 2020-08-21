export const initialState = {
  enrolledcourses: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ENROLLED_COURSES':
      return {
        ...state,
        enrolledcourses: action.payload,
      };
    default:
      return state;
  }
};

export default course;
