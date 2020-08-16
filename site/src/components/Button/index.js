import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";

const Button = ({ className = "", link, onClick, text, btnRef }) => {
  const history = useHistory();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (link) history.push(link);
  };

  return (
    <button ref={btnRef} className={`btn  ${className}`} onClick={handleClick}>
      <p className="">{text}</p>
    </button>
  );
};

export default Button;
