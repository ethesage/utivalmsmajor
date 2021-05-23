import React from 'react';
import { NavLink } from 'react-router-dom';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const BreadCrumbs = () => {
  const [, , currentCourse] = GetCurrentCourse();

  const list_desc =
    currentCourse?.list_desc || currentCourse?.Course?.list_desc;

  const DynamicCourseBreadcrumb = () => (
    <span className="text-theme">{currentCourse?.Course?.name}</span>
  );

  const DynamicClassBreadcrumb = ({ match }) => {
    const { classroom } = match.params;

    let number;

    currentCourse?.Course?.Classes?.find((classr, i) => {
      number = i;
      return classr.id === classroom;
    });

    return (
      <span className="text-theme">
        {list_desc} {!isNaN(number) && number + 1}
      </span>
    );
  };

  const routes = [
    { path: '/courses/overview', breadcrumb: DynamicCourseBreadcrumb },
    { path: '/courses/classroom', breadcrumb: DynamicCourseBreadcrumb },
    {
      path: '/courses/classroom/:courseId/:classroom',
      breadcrumb: DynamicClassBreadcrumb,
    },
    { path: '/courses/classroom/:courseId', breadcrumb: null },
    { path: '/courses/overview/:courseId', breadcrumb: null },
  ];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="flex">
      {breadcrumbs.map(({ match, breadcrumb }, i) => (
        <div key={`crumb_th_${i}`} className="text-xs mr-3">
          <NavLink to={match.url} className="flex">
            {i !== 0 && <span className="mr-2">{' > '}</span>}
            <h3>{breadcrumb}</h3>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
