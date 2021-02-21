import React from 'react';
import Input from '../../../../components/Input';
import './style.scss';

const Card = ({ done }) => {
  return (
    <div className="mt-12 w-full md:w-4/5">
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
