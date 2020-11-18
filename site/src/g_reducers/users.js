export const initialState = [];

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.payload;

    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.payload);

    case 'ADD_USER':
      return [...state, action.payload];

    case 'UPDATE_USER':
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default user;
