import React from 'react';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import NavBar from 'components/CourseNav';
import Plan from '../plan';
import '../style.scss';

const StudyPlan = () => {
  const [, error, currentCohort] = GetCurrentCohort();

  if (error) {
    return (
      <div>
        <p>An Error Occured</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <Plan currentCourse={currentCohort} />
    </>
  );
};

export default StudyPlan;
