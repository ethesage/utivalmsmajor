import React, { useState } from 'react';
import './style.scss';

const Select = ({ name, types, handleSelect }) => {
  const [presentValue, setPresentValue] = useState('');

  const parent = React.createRef();

  const handleClick = (name, value) => {
    setPresentValue(value);
    let target = { name, value };
    handleSelect({ target });
  };

  const options = types.map((input, index) => {
    return (
      <button
        className={`rad_options ${
          input.value === presentValue ? 'selected' : ''
        }`}
        type="button"
        key={index}
        value={input.value}
        onClick={() => handleClick(name, input.value)}
      >
        {input.name}
      </button>
    );
  });

  return (
    <div className="input-div radx" ref={parent}>
      {options}
      <span></span>
    </div>
  );
};

export default Select;
