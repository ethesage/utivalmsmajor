import React from 'react';
import './style.scss';

const File_Page = ({
  links,
  children,
  className = '',
  subClassName = '',
  linkClass = '',
}) => {
  return (
    <>
      <div
        className={`side_list_layout flex-row j-start al-start ${className}`}
      >
        <div className="side_list">
          <ul className={linkClass}>{links}</ul>
        </div>
        <div className={`${subClassName}`}>{children}</div>
      </div>
    </>
  );
};

export default File_Page;
