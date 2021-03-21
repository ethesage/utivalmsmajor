import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ResourceBtn = ({
  img,
  text,
  color,
  link,
  handleClick,
  ext,
  attr,
  useLink = true,
}) => {
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
      {ext && (
        <div
          className={`rcx_btn flex-row ${color}`}
          // href={link}
          onClick={handleClick}
          // target={'_'}
          style={{ cursor: 'pointer' }}
        >
          <Inner />
        </div>
      )}
      {!ext &&
        (useLink ? (
          <Link
            to={link}
            className={`rcx_btn flex-row ${color}`}
            onClick={handleClick}
            {...attr}
          >
            {' '}
            <Inner />
          </Link>
        ) : (
          <a
            className={`rcx_btn flex-row ${color}`}
            href={link}
            onClick={handleClick}
            {...attr}
          >
            <Inner />
          </a>
        ))}
    </>
  );
};

export default ResourceBtn;
