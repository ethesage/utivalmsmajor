import React from 'react';
import { useParams } from 'react-router-dom';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import AllAssignments from '../AllAssignments';
import NavBar from 'components/CourseNav';
import '../style.scss';

const AllAssignmnets = ({ gapi }) => {
  const { cohortId } = useParams();
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

      <AllAssignments
        gapi={gapi}
        currentCourse={{ CourseCohort: currentCohort, ...currentCohort }}
        cohortId={cohortId}
        isAdmin
      />
    </>
  );
};

export default AllAssignmnets;
