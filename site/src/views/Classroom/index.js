import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnrolledCourses } from 'g_actions/member';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import NavBar from 'components/CourseNav';
import './style.scss';

const Classroom = ({ full = false, gapi }) => {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { isStudent } = useSelector((state) => state.auth);
  const [openedRef, setOpenedRef] = useState();

  useBreadcrumbs(
    {
      name: currentCourse?.Course?.name,
      link: `/courses/classroom/${courseId}`,
    },
    !!currentCourse
  );

  const userType = isStudent ? 'student' : 'trainer';

  useEffect(() => {
    if (currentCourse) return;

    const course = enrolledcourses.find(
      (course) => course.courseCohortId === courseId
    );

    dispatch(getEnrolledCourses(courseId, course, userType));

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch, userType]);

  return (
    <>
      <NavBar />
      <section className="cx_listnx img">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <div>
            {currentCourse.CourseCohort.Classes.map((class_room, i) => (
              <Classes
                key={`cx_listnx_${i}`}
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
