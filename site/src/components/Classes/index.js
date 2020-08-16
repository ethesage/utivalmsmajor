import React from "react";
import Button from "../Button";
import img from "../../assets/homepage/img1.png";
import week from "../../assets/dashboard/week.png";
import calender from "../../assets/dashboard/calendar.png";
import clock from "../../assets/dashboard/clock.png";
// import no_course from "../../assets/dashboard/no_course.png";
import "./style.scss";

const ClassesSec = () => (
  <div className="next_class flex-row al-start j-space">
    <img src={img} alt="" className="main_img" />
    <div className="text-sec">
      <h2>HR Analtytics</h2>

      <div className="info_sec">
        <div className="info flex-row j-start">
          <img src={week} alt="" /> <p>Week 2</p>
        </div>
        <div className="info flex-row j-start">
          <img src={calender} alt="" />{" "}
          <p>
            Sunday, <strong>June 10,</strong> 2010
          </p>
        </div>
        <div className="info flex-row j-start">
          <img src={clock} alt="" /> <p>10AM</p>
        </div>
      </div>

      <Button
        className="p_btn short flex-row"
        link="/dashboard/courses"
        text="Enter Class"
      />
    </div>
  </div>
);

const Classes = () => {
  return (
    <div className="info_con scrolled flex-col al-start j-start">
      <ClassesSec />

      {/* <div className="n_available flex-col">
        <img src={no_course} alt="no classes" />
        <p className="txts">No classes yet</p>
      </div> */}
    </div>
  );
};

export default Classes;
