import React from 'react';
import { withRouter } from 'react-router-dom';
import Arrow from '../../assets/icons/Arrow';
import './style.scss';

const Button = ({
  className = '',
  link,
  onClick,
  text,
  animate,
  showArrow,
  animateArrow,
  history,
  noHover
}) => {
  const handleClick = () => {
    if (animate) {
    }
    if (onClick) onClick();
    if (link) history.push(link);
  };

  return (
    <button
      className={`btn ${animateArrow ? 'animate-arrow' : ''} ${className} ${
        noHover ? 'no-hover' : ''
      }`}
      onClick={handleClick}
    >
      {showArrow ? <Arrow /> : null} <p>{text}</p>
    </button>
  );
};

export default withRouter(Button);
