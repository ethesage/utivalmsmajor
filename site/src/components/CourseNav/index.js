import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.scss';

const CourseNav = () => {
  const { courseId, cohortId } = useParams();
  const { isStudent, isTrainer } = useSelector((state) => state.auth);

  useEffect(() => {
    const el = document.querySelector('.cx_linz.__active');

    el && el.scrollIntoView(false);

    return () => {};
  }, []);

  let links = [];

  const base_links = [
    { link: `/courses/overview/${courseId}`, title: 'Overview' },
    { link: `/courses/classroom/${courseId}`, title: 'Classroom' },
  ];

  const user_links = [
    { link: `/courses/study-plan/${courseId}`, title: 'Study Plan' },
    { link: `/courses/members/${courseId}`, title: 'Co-learners' },
  ];

  const t_link = [
    { link: `/courses/all-assignments/${courseId}`, title: 'Assignments' },
  ];

  const a_links = [
    {
      link: `/admin/courses/overview/${courseId}/${cohortId}`,
      title: 'Overview',
    },
    {
      link: `/admin/courses/classroom/${courseId}/${cohortId}`,
      title: 'Classroom',
    },
    {
      link: `/admin/courses/students/${courseId}/${cohortId}`,
      title: 'Students',
    },
    {
      link: `/admin/courses/all-assignments/${courseId}/${cohortId}`,
      title: 'Assignments',
    },
    {
      link: `/admin/courses/study-plan/${courseId}/${cohortId}`,
      title: 'Calender',
    },
  ];

  if (isStudent) {
    links = [...base_links, ...user_links];
  } else if (isTrainer) {
    links = [...base_links, ...user_links, ...t_link];
  } else {
    links = a_links;
  }

  return (
    <nav className="cx_det__nav">
      <ul className="flex-row j-start scrolled_ver">
        {links.map((link, i) => (
          <li key={`nav_cx_${i}`} className="cx_nav_item">
            <NavLink
              to={`${link.link}`}
              className="cx_linz"
              activeClassName="__active"
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CourseNav;
