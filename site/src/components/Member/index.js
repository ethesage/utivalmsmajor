import React from "react";
import { Link } from "react-router-dom";
import user_icon from "../../assets/user_icon.png";
import linkedin from "../../assets/icons/linkedin.png";
import "./style.scss";

const Member = () => {
  return (
    <div className="snx_mem flex-col al-start">
      <img src={user_icon} alt="name" className="img_sec" />
      <div className="text_sec">
        <p className="theme-color">Jude Violet</p>
        <small>Data Analyst</small>
        <Link to="">
          <img src={linkedin} alt="linkedIn" />
        </Link>
      </div>
    </div>
  );
};

export default Member;
