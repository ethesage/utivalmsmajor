import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEnrolledCourses } from '../../../../g_actions/student';
import { Progress } from 'react-sweet-progress';
import Image from '../../../../components/Image';
import Loader from '../../../../components/Loading';
import medal from '../../../../assets/icons/medal.png';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const CousreCard = ({ data }) => {
  const { isStudent } = useSelector((state) => state.auth);
  const {
    isCompleted,
    CourseCohort: { dateRange },
    Cohort: { cohort },
    Course: {
      id,
      name,
      thumbnail,
      CourseProgresses: [{ progress }],
    },
  } = data;

  return (
    <div className="p_cx_cd">
      <Link className="img-sec" to={`/dashboard/courses/overview/${id}`}>
        <Image image={thumbnail} imgClass="img cover" lazyLoad={true} />
      </Link>
      <div className="txt-sec">
        <div className="title_sec flex-row j-space">
          <h3 className="theme-color">{name}</h3>
          {isStudent && isCompleted ? <img src={medal} alt="" /> : ''}
        </div>

        {isStudent ? (
          <>
            <div>
              <small>Completion level</small>
              <Progress
                className="slim"
                percent={progress}
                status="error"
                theme={{
                  success: {
                    symbol: '‍',
                    color: 'rgb(223, 105, 180)',
                  },
                  error: {
                    symbol: '40%',
                    color: 'red',
                  },
                  default: {
                    symbol: '😱',
                    color: '#fbc630',
                  },
                }}
              />
            </div>
            <div className="grade flex-row j-space">
              <small>
                <strong>Grade:</strong> 100
              </small>
              <button>
                <small>View Details</small>
              </button>
            </div>
          </>
        ) : null}

        {isCompleted ? (
          <div className="chx flex-row j-space">
            <strong>
              <p>{cohort} Cohort</p>
            </strong>
            <small>{dateRange}</small>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CourseList = () => {
  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);

  useEffect(() => {
    if (!enrolledcourses)
      (async () => {
        await dispatch(getEnrolledCourses());
      })();

    return () => {};
  }, [dispatch, enrolledcourses]);

  return (
    <div className="main flex-col cx_list_con j-start al-start">
      <nav className="nav_cux">
        <Link to="/dashboard/courses" className="reg_text">
          <h3>My Courses</h3>
        </Link>
      </nav>
      {!enrolledcourses ? (
        <Loader tempLoad={true} full={false} />
      ) : (
        <section className="course_list">
          {enrolledcourses.length === 0 ? (
            <div>Not found</div>
          ) : (
            enrolledcourses.map((course, i) => (
              <CousreCard data={course} key={`enrolled_c_${i}`} />
            ))
          )}
        </section>
      )}
    </div>
  );
};

export default CourseList;
