import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Progress } from 'react-sweet-progress';
import Image from 'components/Image';
import medal from 'assets/icons/medal.png';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const CousreCard = ({ data }) => {
  const { isStudent } = useSelector((state) => state.auth);

  console.log(data);

  const {
    isCompleted,
    CourseCohort: { id, dateRange },
    Course,
    Cohort,
  } = data;

  return (
    <div className="p_cx_cd">
      <Link className="img-sec" to={`/courses/overview/${id}`}>
        <Image image={Course.thumbnail} imgClass="img cover" lazyLoad={true} />
      </Link>
      <div className="txt-sec">
        <div className="title_sec flex-row j-space">
          <h3 className="theme-color">{Course.name}</h3>
          {isStudent && isCompleted ? <img src={medal} alt="" /> : ''}
        </div>

        {isStudent ? (
          <>
            <div>
              <small>Completion level</small>
              <Progress
                className="slim"
                percent={
                  Course.CourseProgresses[0]
                    ? Course.CourseProgresses[0].progress
                    : 0
                }
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

        {!isStudent ? (
          <div className="chx flex-row j-space">
            <strong>{<p>{Cohort?.cohort} Cohort</p>}</strong>
            <small>{dateRange}</small>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CourseList = () => {
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);

  return (
    <div className="main flex-col cx_list_con j-start al-start">
      <section className="course_list">
        {enrolledcourses.map((course, i) => (
          <CousreCard data={course} key={`enrolled_c_${i}`} />
        ))}
      </section>
    </div>
  );
};

export default CourseList;
