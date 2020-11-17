export const initialState = null;

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_TRAINERS':
      return action.payload;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default course;
