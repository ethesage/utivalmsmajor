import { useEffect } from 'react';
import { addCrumb } from 'g_actions/breadcrumbs';
import { useDispatch } from 'react-redux';

const useBreadCrumbs = (crumb, state) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) return;
    dispatch(addCrumb(crumb));

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crumb, state]);
};

export default useBreadCrumbs;
