import { axiosInstance } from '../helpers';

export const getAllStudents = () => async (dispatch) => {
  const students = await axiosInstance.get(`/admin/users/student`);

  dispatch({
    type: 'GET_ALL_STUDENTS',
    payload: students.data.data,
  });
};
