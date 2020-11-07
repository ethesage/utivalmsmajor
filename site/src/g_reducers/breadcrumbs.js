export const initialState = [];

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CRUMB':
      return [...state, { ...action.payload }];

    case 'SPLICE_BREADCRUMB':
      const new_state = [...state];
      new_state.splice(action.payload);

      return new_state;
    default:
      return state;
  }
};

export default course;
//SPLICE_BREADCRUMB
