import React from "react";
import Input from "../../../../components/Input";
import "./style.scss";

const Card = ({ done }) => {
  return (
    <div className="pay-card">
      <Input placeHolder="Holder Name" />
      <Input placeHolder="Card Number" />
      <Input placeHolder="Expiry Date" type="date" />
      <Input placeHolder="cvv" />
      <button className="btn" onClick={done}>
        <p>Pay $100</p>
      </button>
    </div>
  );
};

export default Card;
