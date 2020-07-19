import React from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";

const Button = ({
  className = "",
  link,
  onClick,
  text,
  animate,
  animateArrow,
  history,
  noHover,
}) => {
  const handleClick = () => {
    if (animate) {
    }
    if (onClick) onClick();
    if (link) history.push(link);
  };

  return (
    <button
      className={`btn ${animateArrow ? "animate-arrow" : ""} ${className} ${
        noHover ? "no-hover" : ""
      }`}
      onClick={handleClick}
    >
      <p>{text}</p>
    </button>
  );
};

export default withRouter(Button);
