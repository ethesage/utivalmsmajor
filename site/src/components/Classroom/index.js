import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnrolledCourses } from '../../g_actions/student';
import Loader from '../../components/Loading';
import Classes from './Classes';
import NavBar from '../../components/CourseNav';
import './style.scss';

const Classroom = ({ full = false, gapi }) => {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);
  const currentCourse = useSelector((state) => state.student.currentCourse);

  useEffect(() => {
    if (!enrolledcourses && !currentCourse)
      (async () => {
        await dispatch(getEnrolledCourses(courseId));
      })();

    return () => {};
  }, [dispatch, enrolledcourses, courseId, currentCourse]);

  useEffect(() => {
    if (!enrolledcourses) return;
    if (currentCourse) return;

    dispatch(
      getEnrolledCourses(
        courseId,
        enrolledcourses &&
          enrolledcourses.find((course) => course.id === courseId)
      )
    );

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch]);

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
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Classroom;
