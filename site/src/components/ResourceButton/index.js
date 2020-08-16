import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const ResourceBtn = ({ img, text, color, link, handleClick }) => {
  return (
    <Link
      className={`rcx_btn flex-row ${color}`}
      to={link}
      onClick={handleClick}
    >
      <div className="rcx_img flex-row">
        <img src={img} alt={text} />
      </div>
      <div className="txt flex-row">
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default ResourceBtn;
