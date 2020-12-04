import React, { useState, useEffect } from 'react';
import Calender from 'components/Calender';
import './style.scss';

const StudyPlan = ({ currentCourse }) => {
  const [classdays, setClassdays] = useState();

  useEffect(() => {
    if (!currentCourse?.CourseCohort) return;
    if (!classdays) {
      const tempDays = [];

      currentCourse.CourseCohort.Classes.forEach((_class) => {
        if (_class.ClassDays[0]) {
          tempDays.push({ ..._class.ClassDays[0], title: _class.title });
        }
      });

      setClassdays(tempDays);
    }
    return () => {};
  }, [classdays, currentCourse]);

  return (
    <>
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
