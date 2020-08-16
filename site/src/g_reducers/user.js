export const initialState = {
  user: null,
  isAdmin: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "Login":
      return action.payload;
    case "Log_out":
      return action.payload;
    default:
      return state;
  }
};

export default user;
