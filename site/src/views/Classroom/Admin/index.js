import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Nav from 'components/AdminHeader';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import NavBar from 'components/CourseNav';
import AddClass from 'assets/addClass.png';
import AddNewClass from 'views/AddClass';
import '../style.scss';

const Classroom = ({ full = false, gapi }) => {
  const { courseId, cohortId } = useParams();
  const { pathname } = useLocation();
  const [openedRef, setOpenedRef] = useState();
  const [loading, error, currentCohort, currentCourse] = GetCurrentCohort();
  const create = pathname.includes('add');

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
        text={create ? null : 'Add Class'}
      />
      <NavBar />
      <section className="cx_listnx img">
        {loading ? (
          <Loader tempLoad={true} full={false} />
        ) : currentCohort?.Classes?.length > 0 || create ? (
          !create ? (
            <div>
              {currentCohort.Classes.map((class_room, i) => (
                <Classes
                  key={`cx_listnx_${i}`}
                  data={class_room}
                  courseId={courseId}
                  full={full}
                  index={i}
                  gapi={gapi}
                  openedRef={openedRef}
                  setOpenedRef={setOpenedRef}
                  folderId={currentCohort.folderId}
                  cohortId={cohortId}
                />
              ))}
            </div>
          ) : (
            <AddNewClass
              name={currentCourse?.name}
              courseId={courseId}
              mainCohortId={currentCohort?.Cohort?.id}
            />
          )
        ) : (
          <div className="flex-col" style={{ minHeight: '500px' }}>
            <img src={AddClass} alt="No Class" />
            <p>No classroom has been added yet</p>
            <Link to={`${pathname}/add`} style={{ marginTop: '20px' }}>
              <strong>
                <p className="theme-color">Add Class</p>
              </strong>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Classroom;
