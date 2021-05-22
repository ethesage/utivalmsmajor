import axios from 'axios';

export const getNgnConversionRate = () => async (dispatch) => {
  let currency_cov;
  try {
    currency_cov = await axios.get(
      'https://free.currconv.com/api/v7/convert?q=USD_NGN&compact=ultra&apiKey=182a1e889cc4b28ef85d'
    );

    dispatch({
      type: 'GET_NGN_EXCHANGE_RATE',
      payload: currency_cov.data,
    });
  } catch (error) {
    return error;
  }
};
