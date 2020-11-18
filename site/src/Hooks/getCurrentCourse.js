import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from 'Hooks/useFetch';
import { getEnrolledCourses } from 'g_actions/member';

export default () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, enrolledcourses } = useSelector(
    (state) => state.member
  );
  const { isStudent } = useSelector((state) => state.auth);
  const userType = isStudent ? 'student' : 'trainer';
  const [loading, error, fetch] = useFetch(dispatch, !!!currentCourse);

  useEffect(() => {
    if (currentCourse) return;

    fetch(() => getEnrolledCourses(courseId, null, userType));

    return () => {};
  }, [
    enrolledcourses,
    courseId,
    currentCourse,
    dispatch,
    userType,
    loading,
    error,
    fetch,
  ]);

  return [loading, error, currentCourse];
};
