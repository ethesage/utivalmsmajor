import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Nav from 'components/AdminHeader';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import Loader from 'components/Loading';
import NavBar from 'components/CourseNav';
import AddNewClass from './AddClassView';
import { ToastProvider } from 'react-toast-notifications';
import './style.scss';

const Classroom = (props) => {
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
        text={props.edit ? null : 'Add Class'}
      />
      <NavBar />
      <section className="cx_listnx img">
        {loading ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <ToastProvider>
            <AddNewClass
              name={currentCourse?.name}
              courseId={courseId}
              mainCohortId={currentCohort?.Cohort?.id}
              {...props}
            />
          </ToastProvider>
        )}
      </section>
    </>
  );
};

export default Classroom;
