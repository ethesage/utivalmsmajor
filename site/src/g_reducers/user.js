export const initialState = {
  user: null,
  isAdmin: false,
  isTrainer: false,
  isStudent: false,
  loading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'Login':
      return {
        ...action.payload,
        loading: state.loading,
      };
    case 'Log_out':
      return {
        ...initialState,
      };
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default user;
