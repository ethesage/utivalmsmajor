import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from 'components/CourseNav';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import { useSelector } from 'react-redux';
import Plan from './plan';
import './style.scss';

const StudyPlan = () => {
  const { courseId } = useParams();
  const currentCourse = useSelector((state) => state.member.currentCourse);
  GetCurrentCourse();

  useBreadcrumbs(
    [
      {
        name: currentCourse?.Course?.name,
        link: `/courses/classroom/${courseId}`,
      },
      { name: 'Study Plan', link: '#' },
    ],
    !!currentCourse
  );

  return (
    <>
      <NavBar />

      <Plan currentCourse={currentCourse} />
    </>
  );
};

export default StudyPlan;
