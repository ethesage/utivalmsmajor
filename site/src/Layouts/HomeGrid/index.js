import React from 'react';
import './style.css';

const HomeGrid = ({ children, className = '' }) => {
  return <div className={`hmx_gd ${className}`}>{children}</div>;
};

export default HomeGrid;
