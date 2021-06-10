import React from 'react';
import './style.scss';

const CountCard = ({ data: { title, num, img } }) => (
  <div className="count_card flex-col al-start j-start">
    <p className="c_title">{title}</p>
    <div className="c_img-sec flex-row j-space">
      <p>{num}</p>
      <div className="img_con flex-row">
        <img src={img} alt="course" className="contain" />
      </div>
    </div>
  </div>
);

export default CountCard;
