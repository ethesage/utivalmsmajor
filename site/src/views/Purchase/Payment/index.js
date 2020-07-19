import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
import category from "../../../data/categories";
import card from "../../../assets/icons/card.png";
import paystack from "../../../assets/icons/paystack.png";
import paypal from "../../../assets/icons/paypal.png";
import approved from "../../../assets/approved.png";
import Card from "./Card";
import "./style.scss";

// const course = category[0].data[0];

const Payment = ({ back }) => {
  // const [current, setPage] = useState(0);
  const disRef = useRef();

  const goBack = () => {
    back(0);
  };

  function done() {
    disRef.current.showModal();
  }

  return (
    <div className="payment container">
      <dialog ref={disRef} className="d_s_c">
        <div className="content flex-col">
          <img src={approved} alt="approved" />
          <div className="reg_text">
            <h2 className="hd">Successful</h2>
            <p>Your payment is successful</p>
          </div>

          <button className="btn">Start Learning</button>
        </div>
      </dialog>
      <div className="payment_con mx-auto">
        <nav className="nav-sec flex-row j-space">
          <div className="nav-item">
            <img src={card} alt="card" />
          </div>
          <div className="nav-item">
            <img src={paystack} alt="paystack" />
          </div>
          <div className="nav-item">
            <img src={paypal} alt="paypal" />
          </div>
        </nav>

        <div className="flex-row card-sec">
          <Card done={done} />
        </div>

        <button className="back" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Payment;
