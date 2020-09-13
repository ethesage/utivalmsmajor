import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './style.scss';

const CourseNav = () => {
  const { courseId } = useParams();

  const links = [
    { link: `overview/${courseId}`, title: 'Overview' },
    { link: `classroom/${courseId}`, title: 'Classroom' },
    { link: `study-plan/${courseId}`, title: 'Study Plan' },
    { link: `members/${courseId}`, title: 'Members' },
  ];

  return (
    <nav className="cx_det__nav">
      <ul className="flex-row j-space scrolled_ver">
        {links.map((link, i) => (
          <li key={`nav_cx_${i}`} className="cx_nav_item">
            <NavLink to={`/courses/${link.link}`} activeClassName="__active">
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CourseNav;
