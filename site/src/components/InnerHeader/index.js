import React from 'react';
import './style.scss';

const InnerHeader = ({ children }) => {
  return <nav className="nav_cux flex-row j-start">{children}</nav>;
};

export default InnerHeader;
