export const initialState = {
  users: [],
  currentPage: 0,
  pageCount: 0,
  pageSize: 0,
  count: 0,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        users: action.payload.rows,
        ...action.payload.paginationMeta,
      };

    case "GET_MORE_USERS":
      return {
        users: action.payload.rows,
        ...action.payload.paginationMeta,
      };

    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);

    case "ADD_USER":
      return [...state, action.payload];

    case "UPDATE_USER":
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

export default user;
