import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import NavBar from 'components/CourseNav';
import './style.scss';

const Classroom = ({ full = false, gapi }) => {
  const { courseId } = useParams();

  const currentCourse = useSelector((state) => state.member.currentCourse);
  const [openedRef, setOpenedRef] = useState();

  GetCurrentCourse();

  useBreadcrumbs(
    {
      name: currentCourse?.Course?.name,
      link: `/courses/classroom/${courseId}`,
    },
    !!currentCourse
  );

  return (
    <>
      <NavBar />
      <section className="cx_listnx img">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <div>
            {currentCourse.Course.Classes.map((class_room, i) => (
              <Classes
                key={`cx_listnx_${i}`}
                trainers={``}
                data={class_room}
                courseId={courseId}
                full={full}
                index={i}
                gapi={gapi}
                openedRef={openedRef}
                setOpenedRef={setOpenedRef}
                folderId={currentCourse.CourseCohort.folderId}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Classroom;
