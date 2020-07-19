import React from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input";
import category from "../../../data/categories";
import "./style.scss";

const course = category[0].data[0];

const Details = ({ proceed }) => {
  const { img, title, desc, value, cost, level, duration, link } = course;

  const checkout = () => {
    proceed(1);
  };

  return (
    <div className="details">
      <div className="container">
        <div className="details_con mx-auto">
          <div className="img-sec flex-row j-end">
            <img src={img} alt={title} className="img cover" />
          </div>
          <div className="text-sec flex-col j-space al-start">
            <h2>{title}</h2>
            <p className="clipped-text" style={{ "--number": 4 }}>
              {desc}
            </p>
            <div className="c_inf flex-row j-space">
              <small>{duration} Weeks</small>
              <small>
                {"> "}
                {level}
              </small>
              <small>{value}</small>
            </div>
            <Link to={link} className="ext btn theme centered">
              <p>Learn More</p>
            </Link>
            {/* <Button /> */}
          </div>
          <div className="summary flex-row j-start">
            <div className="contents">
              <div className="cost-analysis">
                <div className="flex-row j-space">
                  <p>Price</p>
                  <p>${Math.round(cost / 380)}</p>
                </div>
                <div className="flex-row j-space">
                  <p>Discount</p>
                  <p>-</p>
                </div>
                <div className="flex-row j-space theme-color strong">
                  <p>Total</p>
                  <p>${Math.round(cost / 380)}</p>
                </div>
              </div>
              <div className="checkout">
                <p className="header">Apply Coupon Code</p>

                <Input name="coupon" placeHolder="" />
                <button className="btn centered" onClick={checkout}>
                  <p>Checkout</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
