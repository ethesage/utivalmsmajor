import React from 'react';
import { Link } from 'react-router-dom';
import not_found from 'assets/not_found.png';
import './style.scss';

const ClassesSec = ({
  data: {
    id,
    courseId,
    dateRange,
    totalStudent,
    Cohort: { cohort },
    CohortTrainers,
  },
  thumbnail,
}) => {
  const countedtrainers = {};
  const trainers = CohortTrainers.reduce((acc, cur) => {
    if (!cur.Trainer) {
      return acc;
    }

    if (!countedtrainers[cur?.Trainer?.userId]) {
      countedtrainers[cur?.Trainer?.userId] = 1;
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <Link
      to={`/admin/courses/overview/${courseId}/${id}`}
      className="next_class flex-row al-start j-space"
    >
      <img src={thumbnail} alt="" className="main_img cover" />
      <div className="text-sec flex-col j-space al-start">
        <div>
          <h2>{cohort}</h2>
          <small>{dateRange}</small>
        </div>

        <div className="info_sec ">
          <div className="info">
            <strong className="flex-row j-start">
              <small>{trainers} Trainers</small>
              <small style={{ margin: '0 10px' }}>|</small>
              <small>{totalStudent} Students</small>
            </strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Classes = ({ data, thumbnail }) => {
  if (!data || data?.length === 0) {
    return (
      <div className="nt_found img flex-col">
        <img src={not_found} alt="Not found" />
        <p className="text">There are no Cohorts yet</p>
      </div>
    );
  }

  return (
    <div className="p_sec_admin flex-row j-start">
      {data.map((nextclass, i) => (
        <ClassesSec
          key={`next_classes_${i}`}
          data={nextclass}
          thumbnail={thumbnail}
        />
      ))}
    </div>
  );
};

export default Classes;
