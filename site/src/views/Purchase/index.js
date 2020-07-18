import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import category from "../../data/categories";
import Details from "./Details";
import "./style.scss";

const course = category[0].data[0];

const Purchase = () => {
  console.log(course);
  return (
    <main className="purchase">
      <div className="nav container flex-row j-start">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <h2 className="hd middle">Purchase Course</h2>
      <div className="purchase_con">
        <div className="nav"></div>
        <div>
          <Details data={course} />
        </div>
      </div>
    </main>
  );
};

export default Purchase;
