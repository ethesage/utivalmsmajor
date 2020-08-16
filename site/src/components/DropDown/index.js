import React from 'react';
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
        {header}
      </div>
      <div className="drops">{children}</div>
    </div>
  );
};

export default DropDown;
