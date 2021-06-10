export const initialState = {
  exchange_rate_ngn: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NGN_EXCHANGE_RATE":
      return {
        ...state,
        exchange_rate_ngn: action.payload,
      };
    default:
      return state;
  }
};

export default course;
