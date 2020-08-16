import React from "react";
import NavBar from "../../components/CourseNav";
import Calender from "../../components/Calender";
import "./style.scss";

const StudyPlan = () => {
  return (
    <>
      <NavBar />
      <section className="stdx">
        <Calender />
      </section>
    </>
  );
};

export default StudyPlan;
