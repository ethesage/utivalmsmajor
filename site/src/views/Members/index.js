import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sekeleton from 'react-skeleton-loader';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import { getEnrolledMembers, getEnrolledCourses } from 'g_actions/member';
import NavBar from 'components/CourseNav';
import MemberCard from 'components/Member';

// import
import './style.scss';

const Members = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { enrolledStudents } = useSelector((state) => state.member);
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

  useEffect(() => {
    if (!enrolledStudents) {
      (async () => {
        await dispatch(getEnrolledMembers(courseId));
      })();
    }
    return () => {};
  }, [enrolledStudents, dispatch, courseId]);

  useBreadcrumbs(
    [
      {
        name: currentCourse?.Course?.name,
        link: `/courses/classroom/${courseId}`,
      },
      { name: 'Members', link: '#' },
    ],
    !!currentCourse
  );

  const Loader = () => (
    <div className="snx_mem">
      <Sekeleton width="120%" height="100%" />
    </div>
  );

  const NoClass = () => <div>No members enrolled yet</div>;

  return (
    <>
      <NavBar />
      <section className="members">
        <h3>{enrolledStudents && enrolledStudents.length} Total Members</h3>

        <div className="memx_sec">
          {!enrolledStudents ? (
            [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
          ) : enrolledStudents.length === 0 ? (
            <NoClass />
          ) : (
            enrolledStudents.map((students, i) => (
              <MemberCard key={`enrolled_students_${i}`} data={students} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Members;
