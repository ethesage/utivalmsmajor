import React from 'react';
import Button from '../Button';

const Confirm = ({ text, close, onClick }) => {
  return (
    <div>
      <h2>{text}</h2>
      <div>
        <Button text="yes" onClick={onClick} />
        <Button text="No" onClick={close} />
      </div>
    </div>
  );
};

export default Confirm;
