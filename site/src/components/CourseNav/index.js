import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.scss';

const CourseNav = () => {
  const { courseId } = useParams();
  const { isStudent, isTrainer } = useSelector((state) => state.auth);

  useEffect(() => {
    const el = document.querySelector('.cx_linz.__active');

    el && el.scrollIntoView(false);

    return () => {};
  }, []);

  let links = [];

  const base_links = [
    { link: `overview/${courseId}`, title: 'Overview' },
    { link: `classroom/${courseId}`, title: 'Classroom' },
  ];

  const user_links = [
    { link: `study-plan/${courseId}`, title: 'Study Plan' },
    { link: `members/${courseId}`, title: 'Members' },
  ];

  const t_link = [
    { link: `all-assignments/${courseId}`, title: 'Assignments' },
  ];

  const a_links = [
    { link: `study-plan/${courseId}`, title: 'Calender' },
    { link: `students`, title: 'Students' },
  ];

  if (isStudent) {
    links = [...base_links, ...user_links];
  } else if (isTrainer) {
    links = [...base_links, ...user_links, ...t_link];
  } else {
    links = [...base_links, ...t_link, ...a_links];
  }

  return (
    <nav className="cx_det__nav">
      <ul className="flex-row j-start scrolled_ver">
        {links.map((link, i) => (
          <li key={`nav_cx_${i}`} className="cx_nav_item">
            <NavLink
              to={`/courses/${link.link}`}
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
