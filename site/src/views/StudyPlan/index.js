import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/CourseNav';
import Calender from '../../components/Calender';
import { useDispatch, useSelector } from 'react-redux';
import Sekeleton from 'react-skeleton-loader';
import { getClassDays } from '../../g_actions/student';
import './style.scss';

const StudyPlan = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const classdays = useSelector((state) => state.student.classdays);

  useEffect(() => {
    if (!classdays) {
      (async () => {
        await dispatch(getClassDays(courseId));
      })();
    }
    return () => {};
  }, [classdays, dispatch, courseId]);

  console.log(classdays);

  return (
    <>
      <NavBar />
      <section className="stdx">
        <Calender data={classdays} />
      </section>
    </>
  );
};

export default StudyPlan;
