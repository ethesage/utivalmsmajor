import React from 'react';
import Input from 'components/Input';
import class_icon from 'assets/icons/class_icon.png';

const AddAssignment = ({ title }) => {
  return (
    <div className="add_ass cx_listnx_con flex-row">
      <div>
        <h2 className="h_con flex-row j-start">
          <img src={class_icon} alt="class" />
          <span>{title}</span>
        </h2>

        <div>
          <span>Title</span>
          <Input />

          <span>Text</span>
          <Input />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AddAssignment;
