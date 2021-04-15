import { useEffect } from 'react';
import useFetch from 'Hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { getNgnConversionRate } from 'g_actions/generals';

const GetConversionRate = () => {
  const dispatch = useDispatch();
  const { exchange_rate_ngn } = useSelector((state) => state.generals);
  const [loading, , fetch] = useFetch(dispatch, !!!exchange_rate_ngn, true);

  useEffect(() => {
    if (exchange_rate_ngn) return;

    if (loading) {
      fetch(() => getNgnConversionRate(exchange_rate_ngn));
    }

    return () => {};
  }, [exchange_rate_ngn, fetch, loading]);

  return [loading, { USD_NGN: 400 }];
};

export default GetConversionRate;
