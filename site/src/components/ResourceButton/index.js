import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ResourceBtn = ({ img, text, color, link, handleClick, ext }) => {
  const Inner = () => {
    return (
      <>
        <div className="rcx_img flex-row">
          <img src={img} alt={text} />
        </div>
        <div className="txt flex-row">
          <p>{text}</p>
        </div>
      </>
    );
  };

  return (
    <>
      {ext ? (
        <a
          className={`rcx_btn flex-row ${color}`}
          href={link}
          onClick={handleClick}
          target={'_'}
        >
          <Inner />
        </a>
      ) : (
        <Link
          className={`rcx_btn flex-row ${color}`}
          to={link}
          onClick={handleClick}
        >
          <Inner />
        </Link>
      )}
    </>
  );
};

export default ResourceBtn;
