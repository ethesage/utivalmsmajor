import React from 'react';
import './style.scss';

const HomeGrid = ({ children, className = '' }) => {
  return <div className={`hmx_gd ${className}`}>{children}</div>;
};

export default HomeGrid;
