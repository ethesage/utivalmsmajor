import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import Loader from 'components/Loading';
import CourseCard from '../ActiveCourseCard';
import Facilitators from '../Facilitators';
import NavBar from '../CourseNav';
import './style.scss';

const Overview = () => {
  const { isStudent } = useSelector((state) => state.auth);

  const { courseId } = useParams();
  const { currentCourse } = useSelector((state) => state.member);
  const [errorState] = useState('none');

  GetCurrentCourse();

  useBreadcrumbs(
    {
      name: currentCourse?.Course?.name,
      link: `/courses/overview/${courseId}`,
    },
    !!currentCourse
  );

  return (
    <>
      <NavBar />
      <section className="cx_ovx">
        {!currentCourse && errorState === 'none' ? (
          <Loader tempLoad={true} full={false} />
        ) : errorState === 'error' || currentCourse.length === 0 ? (
          <div>Course Not found</div>
        ) : (
          <>
            <div className="ac_crd">
              <CourseCard
                course={currentCourse.Course}
                cohort={currentCourse.Cohort}
                isStudent={isStudent}
                range={currentCourse.CourseCohort.dateRange}
              />
              <Facilitators trainers={currentCourse.CourseCohort.Classes} />
            </div>

            <div className="info_sec _text">
              <div className="info">
                <h2>{currentCourse.Course.name}</h2>
                <p>{currentCourse.Course.description}</p>
              </div>

              <div className="list_info">
                <h2>What you will {isStudent ? 'learn' : 'teach'}</h2>
                {currentCourse.Course.CourseDescriptions.map((classr, i) => (
                  <div className="list" key={`descriptors_${i}`}>
                    <span className="flex-row">
                      <p>{i + 1}</p>
                    </span>
                    <h3>{classr.title}</h3>
                    <p>{classr.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Overview;
