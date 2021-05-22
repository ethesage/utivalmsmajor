import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countDetails } from 'g_actions/member';

const CountSection = () => {
  const counts = useSelector((state) => state.member.counts);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(countDetails());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!counts) return;

    return () => {};
  }, [counts]);

  return <section className="bg-white w-full"></section>;
};

export default CountSection;
