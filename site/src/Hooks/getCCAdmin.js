import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from 'Hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCourse } from 'g_actions/admin';

export default () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { currentCourse } = useSelector((state) => state.admin);
  const [loading, error, fetch] = useFetch(dispatch, !!!currentCourse);

  useEffect(() => {
    if (!courseId) return;
    if (currentCourse) return;

    fetch(() => getCurrentCourse(null, courseId));

    return () => {};
  }, [currentCourse, fetch, courseId]);

  return [loading, error, currentCourse];
};
