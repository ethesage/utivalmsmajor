export const initialState = [];

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CRUMB':
      return action.payload;

    default:
      return state;
  }
};

export default course;