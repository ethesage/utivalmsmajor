import React from 'react';
import { useParams } from 'react-router-dom';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import NavBar from 'components/CourseNav';
import Member from '../members';
import '../style.scss';

const Members = () => {
  const { cohortId } = useParams();
  const [, error] = GetCurrentCohort();

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
      <Member courseId={cohortId} />
    </>
  );
};

export default Members;
