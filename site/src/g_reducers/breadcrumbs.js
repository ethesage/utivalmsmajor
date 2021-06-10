export const initialState = [];

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CRUMB':
      return [...state, { ...action.payload }];

    case 'SPLICE_BREADCRUMB':
      const new_state = [...state];
      new_state.splice(action.payload);
      return new_state;

    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default course;
