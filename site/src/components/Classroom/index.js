import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnrolledCourses } from '../../g_actions/student';
import Loader from '../../components/Loading';
import Classes from './Classes';
import NavBar from '../../components/CourseNav';
import './style.scss';

const Classroom = ({ full = false }) => {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);
  const [data, setData] = useState(
    enrolledcourses &&
      enrolledcourses.find((course) => course.Course.id === courseId)
        .CourseCohort.Classes
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
          .CourseCohort.Classes
    );

    return () => {};
  }, [enrolledcourses, courseId]);

  return (
    <>
      <NavBar />
      <section className="cx_listnx img">
        {!data ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <div>
            {data.map((class_room, i) => (
              <Classes
                key={`cx_listnx_${i}`}
                data={class_room}
                courseId={courseId}
                full={full}
                index={i}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Classroom;
