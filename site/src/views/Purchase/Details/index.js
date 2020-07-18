import React from "react";
import "./style.scss";

const Details = ({ img, title, desc, value, cost, level, duration }) => {
  return (
    <div className="">
      <div>
        <div>
          <img src={img} alt={title} />
        </div>
        <div>
          <h2>{desc}</h2>
        </div>
      </div>
    </div>
  );
};

export default Details;
