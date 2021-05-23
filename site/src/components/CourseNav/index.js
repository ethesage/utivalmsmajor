import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { filterDate } from 'helpers';
import moment from 'moment';
import banner from 'assets/layout/banner.png';

const CourseNav = ({ currentCourse }) => {
  const { courseId, cohortId } = useParams();
  const { isStudent, isTrainer } = useSelector((state) => state.auth);

  useEffect(() => {
    const el = document.querySelector('.cx_linz.__active');

    el && el.scrollIntoView(false);

    return () => {};
  }, []);

  const dateData = {
    startDate: filterDate(currentCourse?.CourseCohort?.dateRange)?.startDate,
    endDate: filterDate(currentCourse?.CourseCohort?.dateRange)?.endDate,
  };

  let links = [];

  const base_links = [
    { link: `/courses/overview/${courseId}`, title: 'Overview' },
    { link: `/courses/classroom/${courseId}`, title: 'Lesson' },
  ];

  const user_links = [
    { link: `/courses/study-plan/${courseId}`, title: 'Study Plan' },
    { link: `/courses/members/${courseId}`, title: 'Co-Learners' },
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
      title: 'Lesson',
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
    <nav className="mb-16">
      <div className="p-4 relative bg-theme z-0 rounded-md mb-4">
        {currentCourse?.Course?.name && (
          <div className="flex justify-between md:items-center flex-col md:flex-row">
            <h4 className="text-white text-2xl z-10 ">
              {currentCourse?.Course?.name}
            </h4>

            <div className="z-10 ">
              <p className="text-white text-base md:text-xl mt-3 md:mt-0">
                {currentCourse?.Cohort?.cohort} Cohort
              </p>
              <small className="text-xs text-secondary font-semibold">
                {moment(dateData?.startDate).format('MMM DD, YYYY')} -{' '}
                {moment(dateData?.endDate).format('MMM DD, YYYY')}
              </small>
            </div>
          </div>
        )}

        <img
          src={banner}
          alt="banner"
          className="absolute w-full h-full object-cover top-0 z-0 left-0"
        />
      </div>

      <ul className="flex scrolled_ver overflow-auto rounded-md shadow bg-white">
        {links.map((link, i) => (
          <li key={`nav_cx_${i}`} className="p-3 mr-10">
            <NavLink
              to={`${link.link}`}
              className=" whitespace-nowrap text-sm"
              activeClassName="text-theme font-semibold"
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
