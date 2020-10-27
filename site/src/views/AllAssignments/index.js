import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from 'g_actions/member';
import NavBar from 'components/CourseNav';

// import
import './style.scss';

const AllAssignmnets = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, enrolledcourses } = useSelector(
    (state) => state.member
  );

  useEffect(() => {
    if (currentCourse) return;

    const course = enrolledcourses.find(
      (course) => course.courseCohortId === courseId
    );

    dispatch(getEnrolledCourses(courseId, course, 'trainer'));

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch]);

  console.log()

  return (
    <>
      <NavBar />
      <section className="members"></section>
    </>
  );
};

export default AllAssignmnets;
