import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import NavBar from 'components/CourseNav';
import Member from './members';

// import
import './style.scss';

const Members = () => {
  const { courseId } = useParams();
  const currentCourse = useSelector((state) => state.member.currentCourse);

  GetCurrentCourse();

  useBreadcrumbs(
    [
      {
        name: currentCourse?.Course?.name,
        link: `/courses/classroom/${courseId}`,
      },
      { name: 'Members', link: '#' },
    ],
    !!currentCourse
  );

  return (
    <>
      <NavBar />
      <Member courseId={courseId} />
    </>
  );
};

export default Members;
