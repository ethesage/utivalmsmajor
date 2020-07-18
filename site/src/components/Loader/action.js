export const loading = () => async dispatch => {
  dispatch({
    type: 'LOADING'
  });
};

export const done_loading = () => async dispatch => {
  dispatch({
    type: 'DONE_LOADING'
  });
};
