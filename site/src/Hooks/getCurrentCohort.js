import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getCCAdmin from 'Hooks/getCCAdmin';
import useFetch from 'Hooks/useFetch';
import { getCurrentCourseCohort } from 'g_actions/admin';

const GetCurrentCohort = () => {
  const [c_loading, c_error, currentCourse] = getCCAdmin();

  const { cohortId } = useParams();
  const dispatch = useDispatch();
  const { currentCohort } = useSelector((state) => state.admin);

  const course = currentCohort[currentCourse?.name];

  const [loading, error, fetch] = useFetch(dispatch, !!!course);

  useEffect(() => {
    if (!currentCourse) return;
    if (course) return;

    fetch(() => getCurrentCourseCohort(cohortId, currentCourse.name));

    return () => {};
  }, [cohortId, currentCourse, fetch, currentCohort, course]);

  return [loading || c_loading, error || c_error, course, currentCourse];
};

export default GetCurrentCohort;
