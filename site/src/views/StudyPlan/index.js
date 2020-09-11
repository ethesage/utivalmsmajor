import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/CourseNav';
import Calender from '../../components/Calender';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <>
      <NavBar />
      <section className="stdx">
        <Calender data={classdays} />
      </section>
      <div className="indicators_stdx flex-row j-space">
        <div className="var flex-row">
          <span className="off"></span> <small>Today</small>
        </div>
        <div className="var flex-row">
          <span className="theme"></span> <small>Class</small>
        </div>
        <div className="var flex-row">
          <span className="sec"></span> <small>Assignment</small>
        </div>
      </div>
    </>
  );
};

export default StudyPlan;
