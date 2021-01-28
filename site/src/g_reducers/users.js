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
      return {
        users: state.users.filter((user) => user.id !== action.payload),
        ...action.payload.paginationMeta,
      };

    case "ADD_USER":
      return {
        users: [...state.users, action.payload],
        ...action.payload.paginationMeta,
      };

    case "UPDATE_USER":
      return {
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        }),
        ...action.payload.paginationMeta,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

export default user;
