import React from 'react';
import './style.scss';

const Confirm = ({ text, close, onClick }) => {
  return (
    <div className="confirm_dx">
      <p className='mn_txt'>{text}</p>
      <div className="flex-row">
        <p className='clx_btn' onClick={onClick}>Yes</p>
        <p className='clx_btn' onClick={close}>No</p>
      </div>
    </div>
  );
};

export default Confirm;
