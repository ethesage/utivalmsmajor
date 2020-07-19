import React from "react";
import rex from "../../assets/rex.png";
import "./style.scss";

const SideBard = () => {
  return (
    <div className="side_nav">
      <div className="contents">
        <div className="profile_pic">
          <div className="img-sec">
            <img src={rex} alt="" className="img cover" />
          </div>
          <div className="text-sec"></div>
        </div>
      </div>
    </div>
  );
};

export default SideBard;
