import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnrolledCourses } from '../../g_actions/student';
import Loader from '../../components/Loading';
import CourseCard from '../ActiveCourseCard';
import Facilitators from '../Facilitators';
import NavBar from '../CourseNav';
import './style.scss';

const Overview = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);
  const [data, setData] = useState(
    enrolledcourses &&
      enrolledcourses.find((course) => course.Course.id === courseId)
  );

  useEffect(() => {
    if (!enrolledcourses)
      (async () => {
        await dispatch(getEnrolledCourses());
      })();

    return () => {};
  }, [dispatch, enrolledcourses]);

  useEffect(() => {
    setData(
      enrolledcourses &&
        enrolledcourses.find((course) => course.Course.id === courseId)
    );

    return () => {};
  }, [enrolledcourses, courseId]);

  return (
    <>
      <NavBar />
      <section className="cx_ovx">
        {!data ? (
          <Loader tempLoad={true} full={false} />
        ) : enrolledcourses.length === 0 ? (
          <div>Not found</div>
        ) : (
          <>
            <div className="ac_crd">
              <CourseCard course={data.Course} />
              <Facilitators trainers={data.CourseCohort.Classes} />
            </div>

            <div className="info_sec _text">
              <div className="info">
                <h2>{data.Course.name}</h2>
                <p>{data.Course.description}</p>
              </div>

              <div className="list_info">
                <h2>What you will learn</h2>
                {data.CourseCohort.Classes.map((classr, i) => (
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
