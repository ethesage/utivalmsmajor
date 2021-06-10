export const addCrumb = (crumb) => async (dispatch) => {
  dispatch({
    type: 'ADD_CRUMB',
    payload: crumb,
  });
};

export const spliceAtIndex = (index) => async (dispatch) => {
  dispatch({
    type: 'SPLICE_BREADCRUMB',
    payload: index,
  });
};