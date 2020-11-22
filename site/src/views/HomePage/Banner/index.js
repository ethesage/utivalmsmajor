import React from 'react';
import house from '../../../assets/homepage/house.png';
import ppl from '../../../assets/homepage/ppl.png';
import './style.scss';

const Banner = () => {
  return (
    <div className="banner flex-row al-end">
      <div className="contents flex-col">
        <h1 className="hd middle">Learn a Digital Skill</h1>
        {/* <input className="search-input mx-auto" placeholder="Search course" /> */}
        <img src={house} alt="house" className="img contain" />
      </div>
      <div className="ppl-sec">
        <img src={ppl} alt="people" className="img contain" />
      </div>
    </div>
  );
};

export default Banner;
