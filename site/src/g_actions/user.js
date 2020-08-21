import { get_user, logout } from '../helpers';

export const login = () => async (dispatch) => {
  dispatch({
    type: 'Login',
    payload: get_user(),
  });

  return get_user();
};

export const log_out = () => async (dispatch) => {
  await logout();

  dispatch({
    type: 'Log_out',
    payload: { user: null, isAdmin: null },
  });
};
