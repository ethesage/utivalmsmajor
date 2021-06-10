import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addCrumb, spliceAtIndex } from 'g_actions/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';

const useBreadCrumbs = (crumb, start) => {
  const breadcrumbs = useSelector((state) => state.breadcrumb);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!start) return;

    const addCrumbToList = (crumb, isArray) => {
      if (!crumb) return;
      const length = breadcrumbs.length;

      let existingcrumb;

      if (isArray) {
        existingcrumb = breadcrumbs.find((bcrumb, i) => {
          return bcrumb.name === crumb[0].name;
        });
      } else
        existingcrumb = breadcrumbs.find((bcrumb, i) => {
          return bcrumb.name === crumb.name;
        });

      const index = breadcrumbs.indexOf(existingcrumb);

      if (!!existingcrumb && index + 1 === length && !isArray) return;

      if (!existingcrumb && !isArray) {
        dispatch(addCrumb(crumb));
      } else if (
        !isArray &&
        existingcrumb &&
        index + 1 <= length &&
        pathname === existingcrumb.link
      ) {
        dispatch(spliceAtIndex(index));
        dispatch(addCrumb(crumb));
      } else if (isArray) {
        if (existingcrumb) {
          dispatch(spliceAtIndex(index));
        }

        crumb.forEach((s_crumb) => {
          dispatch(addCrumb(s_crumb));
        });
      }
    };

    if (Array.isArray(crumb)) {
      addCrumbToList(crumb, true);
    } else addCrumbToList(crumb);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);
};

export default useBreadCrumbs;
