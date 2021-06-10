import React from "react";
import { useHistory } from "react-router-dom";
import not_found from "assets/not_found.png";
import Edit from "assets/icons/edit";
import "./style.scss";

const ClassesSec = ({ data, setCurrentCohort, thumbnail, history }) => {
  const {
    id,
    courseId,
    dateRange,
    totalStudent,
    Cohort: { cohort },
    CohortTrainers,
    paymentType,
  } = data;

  const countedtrainers = {};
  const trainers = CohortTrainers?.reduce((acc, cur) => {
    if (!cur.userId) {
      return acc;
    }

    if (!countedtrainers[CohortTrainers?.userId]) {
      countedtrainers[CohortTrainers?.userId] = 1;
      return acc + 1;
    }
    return acc;
  }, 0);

  const showCourse = () => {
    history.push(`/admin/courses/overview/${courseId}/${id}`);
  };

  const editCohortDetails = (e) => {
    e.stopPropagation();
    setCurrentCohort(data);
  };

  return (
    <div className="next_class flex-row al-start j-space" onClick={showCourse}>
      <button className="edit" onClick={editCohortDetails}>
        <Edit />
      </button>

      <img src={thumbnail} alt="" className="main_img cover" />
      <div className="text-sec flex-col j-space al-start">
        <div>
          <h2>{cohort}</h2>
          <small>{dateRange}</small>
        </div>

        <div className="info_sec ">
          <div style={{ marginBottom: "5px" }}>
            <small style={{ textTransform: "capitalize" }}>
              Payment type:{" "}
              <strong className="theme-color">{paymentType}</strong>
            </small>
          </div>
          <div className="info">
            <strong className="flex-row j-start">
              <small>{trainers} Trainers</small>
              <small style={{ margin: "0 10px" }}>|</small>
              <small>{totalStudent} Students</small>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const Classes = ({ data, thumbnail, setCurrentCohort }) => {
  const history = useHistory();

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
          setCurrentCohort={setCurrentCohort}
          history={history}
        />
      ))}
    </div>
  );
};

export default Classes;
