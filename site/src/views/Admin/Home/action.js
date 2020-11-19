import { axiosInstance } from '../../../helpers';

export const getDashdetails = () => async (dispatch) => {
  const dashboard = await axiosInstance.get('/admin/dashboard');

  dispatch({
    type: 'GET_ADMIN_DASHBOARD',
    payload: dashboard.data.data,
  });
};
