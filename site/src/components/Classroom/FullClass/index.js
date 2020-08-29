import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getEnrolledCourses } from '../../../g_actions/student';
import Loader from '../../Loader';
import Classes from '../Classes';
import ResourceBtn from '../../ResourceButton';
import NavBar from '../../CourseNav';
import assignment from '../../../assets/icons/course/assignment.png';
import Layout from '../../SideNavListLayout';
import './style.scss';

// const _data = [
//   {
//     id: 1,
//     title: 'Jude',
//     name: 'Week one - SQL For Data',
//   },
//   {
//     id: 2,
//     title: 'Jude violet',
//     name: 'Week Two - SQL For Data',
//   },
//   {
//     id: 3,
//     title: 'Jude chinoso',
//     name: 'Week Three - SQL For Data',
//   },
//   {
//     id: 4,
//     title: 'Jude okuwanyi',
//     name: 'Week Four - SQL For Data',
//   },
// ];

function FullClass() {
  const { courseId, classroom } = useParams();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);
  const currentCourse = useSelector((state) => state.student.currentCourse);

  useEffect(() => {
    if (!enrolledcourses && !currentCourse)
      (async () => {
        await dispatch(getEnrolledCourses(courseId));
      })();

    return () => {};
  }, [dispatch, enrolledcourses]);

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
  }, [enrolledcourses, courseId]);

  return (
    <>
      <NavBar />
      <div className="cx_listnx_full">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <Layout
            links={currentCourse.CourseCohort.Classes.map((classroom, i) => (
              <li>
                <NavLink
                  className="side_link"
                  to={`/dashboard/courses/classroom/${courseId}/${classroom.id}`}
                  key={`side_link_courses_${i}`}
                >
                  Week {i + 1}
                </NavLink>
              </li>
            ))}
          >
            <Classes
              data={currentCourse.CourseCohort.Classes.find(
                (classrum) => classrum.id === classroom
              )}
              open={true}
              showArrow={false}
              full={true}
            />
            <div className="btns">
              <div className="reg_text">
                <h4>Activities</h4>
                <div className="btn_sec_con flex-row j-start">
                  <div className="btn_sec">
                    <ResourceBtn
                      img={assignment}
                      text="Submit Assignment"
                      color="approved"
                      // link={`/dashboard/courses/assignment/${courseId}/${data.id}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="prev_courses"></div>
          </Layout>
        )}
      </div>
    </>
  );
}
export default FullClass;
