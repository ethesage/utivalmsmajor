import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllAssignments from './AllAssignments';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import NavBar from 'components/CourseNav';
import './style.scss';

const AllAssignmnets = ({ gapi }) => {
  const { courseId, classroom } = useParams();
  const { currentCourse } = useSelector((state) => state.member);

  GetCurrentCourse();

  useBreadcrumbs(
    [
      {
        name: currentCourse?.Course?.name,
        link: `/courses/classroom/${courseId}`,
      },
      {
        name: 'Assignments',
        link: `/courses/all-assignments/${courseId}/${classroom}`,
      },
    ],
    !!currentCourse
  );

  return (
    <>
      <NavBar />

      <AllAssignments gapi={gapi} currentCourse={currentCourse} />
    </>
  );
};

export default AllAssignmnets;
