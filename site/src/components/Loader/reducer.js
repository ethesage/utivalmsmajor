export const initialState = {
  loading: false,
  homepage: false
};

const load = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true
      };
    case 'DONE_LOADING':
      return {
        loading: false
      };

    default:
      return state;
  }
};

export default load;
