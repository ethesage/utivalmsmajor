import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from 'g_actions/member';

export default () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, enrolledcourses } = useSelector(
    (state) => state.member
  );
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
};
