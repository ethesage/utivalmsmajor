import React from "react";
import no_course from "../../assets/dashboard/no_course.png";
import "./style.scss";

const ClassesSec = () => (
  <div className="file_card flex-row al-start j-space"></div>
);

const Files = () => {
  return (
    <div className="info_con scrolled flex-col al-start j-start">
      <ClassesSec />

      <div className="n_available flex-col">
        <img src={no_course} alt="no classes" />
        <p className="txts">You have no activities yet</p>
      </div>
    </div>
  );
};

export default Files;
