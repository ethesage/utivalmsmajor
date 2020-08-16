import { get_user, logout } from "../helpers";

export const login = () => async (dispatch) => {
  const { user, isAdmin } = get_user();

  dispatch({
    type: "Login",
    payload: { user, isAdmin },
  });

  return { user, isAdmin };
};

export const log_out = () => async (dispatch) => {
  await logout();

  dispatch({
    type: "Log_out",
    payload: { user: null, isAdmin: null },
  });
};
