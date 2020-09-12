import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnrolledCourses } from '../../g_actions/student';
import Loader from '../../components/Loading';
import CourseCard from '../ActiveCourseCard';
import Facilitators from '../Facilitators';
import NavBar from '../CourseNav';
import './style.scss';

const Overview = () => {
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
  }, [dispatch, enrolledcourses, currentCourse, courseId]);

  useEffect(() => {
    if (!enrolledcourses) return;
    
    (async () => {
      await dispatch(
        getEnrolledCourses(
          courseId,
          enrolledcourses &&
            enrolledcourses.find((course) => course.id === courseId)
        )
      );
    })();

    return () => {};
  }, [enrolledcourses, courseId, dispatch]);

  return (
    <>
      <NavBar />
      <section className="cx_ovx">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : currentCourse.length === 0 ? (
          <div>Not found</div>
        ) : (
          <>
            <div className="ac_crd">
              <CourseCard course={currentCourse.Course} />
              <Facilitators trainers={currentCourse.CourseCohort.Classes} />
            </div>

            <div className="info_sec _text">
              <div className="info">
                <h2>{currentCourse.Course.name}</h2>
                <p>{currentCourse.Course.description}</p>
              </div>

              <div className="list_info">
                <h2>What you will learn</h2>
                {currentCourse.Course.CourseDescriptions.map((classr, i) => (
                  <div className="list" key={`descriptors_${i}`}>
                    <span className="flex-row">
                      <p>{i + 1}</p>
                    </span>
                    <h3>{classr.title}</h3>
                    <p>{classr.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Overview;
