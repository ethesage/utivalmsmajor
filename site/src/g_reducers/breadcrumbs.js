export const initialState = [];

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CRUMB':
      const n_state = state.map((st) => ({ ...st, active: false }));

      return [...n_state, { ...action.payload, active: true }];

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
