import React from 'react';
import './style.scss';

const ResourceBtn = ({ img, text, color, link, handleClick, ext }) => {
  return (
    <a
      className={`rcx_btn flex-row ${color}`}
      href={link}
      onClick={handleClick}
      target={ext ? '_' : null}
    >
      <div className="rcx_img flex-row">
        <img src={img} alt={text} />
      </div>
      <div className="txt flex-row">
        <p>{text}</p>
      </div>
    </a>
  );
};

export default ResourceBtn;
