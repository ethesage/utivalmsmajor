import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import Image from '../Image';
import medal from 'assets/icons/medal.png';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const CourseListCard = ({ data }) => {
  const { isStudent } = useSelector((state) => state.auth);
  const {
    isCompleted,
    id,
    CourseCohort: { dateRange },
    Cohort: { cohort },
    Course: {
      name,
      thumbnail,
      CourseProgresses: [{ progress }],
    },
  } = data;

  return (
    <div className="p_cx_cd">
      <Link className="img-sec" to={`/courses/overview/${id}`}>
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

const courseListSection = (courses) => {
  return (
    <section className="course_list">
      {courses.map((course, i) => (
        <CourseListCard data={course} key={`enrolled_c_${i}`} />
      ))}
    </section>
  );
};

export default courseListSection;
