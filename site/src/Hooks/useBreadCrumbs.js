import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addCrumb, spliceAtIndex } from 'g_actions/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';

const useBreadCrumbs = (crumb, start = false) => {
  const breadcrumbs = useSelector((state) => state.breadcrumb);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!crumb) return;
    // if(start)''

    const length = breadcrumbs.length;
    let index;
    const existingcrumb = breadcrumbs.find((bcrumb, i) => {
      index = i;
      return bcrumb.name === crumb.name;
    });

    // console.log('==>', breadcrumbs);

    // console.log(index + 1 === length);

    if (!!existingcrumb && index + 1 === length) return;

    if (!existingcrumb) {
      dispatch(addCrumb(crumb));
    } else if (
      existingcrumb &&
      index + 1 < length &&
      pathname === existingcrumb.link
    ) {
      dispatch(spliceAtIndex(index + 1));
    }

    return () => {};
  }, [crumb, pathname, breadcrumbs, dispatch]);
};

export default useBreadCrumbs;
