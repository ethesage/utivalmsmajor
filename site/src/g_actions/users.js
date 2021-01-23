import { axiosInstance } from '../helpers';

export const getAllUsers = () => async (dispatch) => {
  const res = await axiosInstance.get('/user/all?pageLimit=300&currentPage=1');

  dispatch({
    type: 'GET_ALL_USERS',
    payload: res.data.users,
  });
};

export const getMoreUsers = (currentPage) => async (dispatch) => {
  const res = await axiosInstance.get(
    `/user/all?currentPage=${currentPage}&pageLimit=300`
  );

  dispatch({
    type: 'GET_MORE_USERS',
    payload: res.data.users,
  });
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_USER',
    payload: id,
  });
};

export const adduser = (user) => async (dispatch) => {
  dispatch({
    type: 'ADD_USER',
    payload: user,
  });
};

export const updateUser = (user) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_USER',
    payload: user,
  });
};

export const reset = () => async (dispatch) => {
  dispatch({
    type: 'RESET',
  });
};
