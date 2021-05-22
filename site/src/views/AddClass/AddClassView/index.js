import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Nav from 'components/AdminHeader';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import Loader from 'components/Loading';
import NavBar from 'components/CourseNav';
import AddNewClass from '../index';
import './style.scss';

const Classroom = () => {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const [loading, error, currentCohort, currentCourse] = GetCurrentCohort();

  if (error) {
    return (
      <div>
        <p>An Error Occured</p>
      </div>
    );
  }

  return (
    <>
      <Nav
        currentCohort={currentCohort}
        currentCourse={currentCourse}
        link={`${pathname}/add`}
        text="Add Class"
      />
      <NavBar />
      <section className="cx_listnx img">
        {loading ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <AddNewClass
            name={currentCourse?.name}
            courseId={courseId}
            mainCohortId={currentCohort?.Cohort?.id}
          />
        )}
      </section>
    </>
  );
};

export default Classroom;
