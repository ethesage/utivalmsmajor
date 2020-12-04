import React from 'react';
import Close from 'assets/icons/closeX';
import user_icon from 'assets/user_icon.png';
import linkedinPic from 'assets/icons/linkedin.png';
import './style.scss';

const Member = ({
  data: {
    User: { profilePic, firstName, lastName, linkedin, occupation },
  },
  onClick,
  isAdmin,
}) => {
  return (
    <div className="snx_mem flex-col al-start">
      {isAdmin && (
        <div className="rmv flex-row" onClick={onClick}>
          <Close />
        </div>
      )}

      <img src={profilePic || user_icon} alt="name" className="img_sec cover" />
      <div className="text_sec">
        <p className="theme-color">
          {firstName} {lastName}
        </p>
        <small>{occupation}</small>
        <a href={linkedin} target="_">
          <img src={linkedinPic} alt="linkedIn" />
        </a>
      </div>
    </div>
  );
};

export default Member;
