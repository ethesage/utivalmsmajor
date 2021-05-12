import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from 'Hooks/useFetch';
import { getEnrolledCourses } from 'g_actions/member';

const GetCurrentCourse = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, enrolledcourses } = useSelector(
    (state) => state.member
  );
  const { isStudent, user } = useSelector((state) => state.auth);
  const userType = isStudent ? 'student' : 'trainer';

  let course = currentCourse;
  const existingCourse = course?.courseCohortId === courseId;
  if (!existingCourse) {
    course = null;
  }

  const [loading, error, fetch] = useFetch(dispatch, !!!course);

  useEffect(() => {
    if (course) return;

    fetch(() => getEnrolledCourses(courseId, course, userType, user));

    return () => {};
  }, [
    enrolledcourses,
    courseId,
    course,
    dispatch,
    userType,
    loading,
    error,
    fetch,
    user,
  ]);

  return [loading, error, currentCourse];
};

export default GetCurrentCourse;
