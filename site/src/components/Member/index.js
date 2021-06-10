import React from "react";
import Close from "assets/icons/closeX";
import user_icon from "assets/user_icon.png";
import linkedinPic from "assets/icons/linkedin.png";
import "./style.scss";

const Member = ({ data, onClick, isAdmin, setCurrentStudent }) => {
  return (
    <div className="snx_mem flex-col al-start">
      {isAdmin && (
        <div className="rmv flex-row" onClick={onClick}>
          <Close />
        </div>
      )}

      <img
        src={data?.User?.profilePic || user_icon}
        alt="name"
        className="img_sec cover"
      />
      <div className="text_sec">
        <p className="theme-color">
          {data?.User?.firstName} {data?.User?.lastName}
        </p>
        <small>{data?.User?.occupation}</small>
        <div className="flex-row j-space ln">
          <a href={data?.User?.linkedin} target="_">
            <img src={linkedinPic} alt="linkedIn" className="img" />
          </a>

          <small className='hidden' onClick={() => setCurrentStudent(data)}>View</small>
        </div>
      </div>
    </div>
  );
};

export default Member;
