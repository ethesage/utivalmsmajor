import React from 'react';
import './style.scss';

const Students = ({ children }) => {
  return (
    <div className="stx_con">
      <div className="stx_tab">{children}</div>
    </div>
  );
};

export default Students;
