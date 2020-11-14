import React from 'react';
import dots from 'assets/dashboard/dots.png';
import './style.scss';

const DropDown = ({ children, header }) => {
  const onClick = (e) => {
    e.target.nextElementSibling.classList.toggle('op-dp_2x');
  };

  const close = (e) => {
    const opened = document.querySelectorAll('.op-dp_2x');
    opened.forEach((e) => e.classList.remove('op-dp_2x'));
  };

  return (
    <div className="dots" onBlur={close} tabIndex="-1">
      <div className="hd-sec" onClick={onClick}>
        {header ? (
          header
        ) : (
          <div className="flex-row">
            <img src={dots} alt="dots" className="img contain" />
          </div>
        )}
      </div>
      <div className="drops">{children}</div>
    </div>
  );
};

export default DropDown;
