import { get_user, logout } from '../helpers';
import { axiosInstance } from '../helpers';

export const loading = () => async (dispatch) => {
  dispatch({
    type: 'AUTH_LOADING',
    payload: true,
  });
};

export const doneloading = () => async (dispatch) => {
  dispatch({
    type: 'AUTH_LOADING',
    payload: false,
  });
};

export const login = () => async (dispatch) => {
  let isloggedIn;
  dispatch(loading());

  try {
    isloggedIn = await axiosInstance.get('/logged-in');

    dispatch({
      type: 'Login',
      payload: !!isloggedIn && get_user(),
    });

    dispatch(doneloading());
  } catch (err) {
    console.log(err);
    dispatch(doneloading());
  }

  return get_user();
};

export const log_out = () => async (dispatch) => {
  await logout();

  dispatch({
    type: 'Log_out',
  });
};
