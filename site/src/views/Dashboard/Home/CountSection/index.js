import React from "react";
import course from "../../../../assets/icons/dasboard/course.png";
import completed from "../../../../assets/icons/dasboard/completed.png";
import ongoing from "../../../../assets/icons/dasboard/course.png";
import "./style.scss";

const CountCard = () => (
  <div className="c_card flex-col al-start j-start">
    <p>Total Courses</p>
    <div className="img-sec flex-row j-space">
      <p>1</p>
      <div className="img_con">
        <img src={course} alt="course" />
      </div>
    </div>
  </div>
);

const CountSection = () => {
  return (
    <>
      {[1, 2, 3].map((e, i) => (
        <CountCard />
      ))}
    </>
  );
};

export default CountSection;
