import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from 'components/CourseNav';
import Calender from 'components/Calender';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import { getEnrolledCourses } from 'g_actions/member';
import { useDispatch, useSelector } from 'react-redux';
import { getClassDays } from 'g_actions/member';
import './style.scss';

const StudyPlan = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const classdays = useSelector((state) => state.member.classdays);
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { isStudent } = useSelector((state) => state.auth);
  const userType = isStudent ? 'student' : 'trainer';

  useEffect(() => {
    if (currentCourse) return;

    const course = enrolledcourses.find(
      (course) => course.courseCohortId === courseId
    );

    dispatch(getEnrolledCourses(courseId, course, userType));

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch, userType]);

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

  console.log(currentCourse);

  useEffect(() => {
    if (!classdays) {
      (async () => {
        await dispatch(getClassDays(courseId));
      })();
    }
    return () => {};
  }, [classdays, dispatch, courseId]);

  return (
    <>
      <NavBar />
      <section className="stdx">
        <Calender data={classdays} />
      </section>
      <div className="indicators_stdx flex-row j-space">
        <div className="var flex-row">
          <span className="off"></span> <small>Today</small>
        </div>
        <div className="var flex-row">
          <span className="theme"></span> <small>Class</small>
        </div>
        <div className="var flex-row">
          <span className="sec"></span> <small>Assignment</small>
        </div>
      </div>
    </>
  );
};

export default StudyPlan;
