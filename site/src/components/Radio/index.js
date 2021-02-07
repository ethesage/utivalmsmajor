import React, { useState, useEffect } from "react";
import "./style.scss";

const Select = ({ name, types, handleSelect, value, label }) => {
  const [presentValue, setPresentValue] = useState(value);

  useEffect(() => {
    setPresentValue(value);
  }, [value]);

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
          input.value === presentValue ? "selected" : ""
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
      {label && <label className="t_label">{label}</label>}
      <div>{options}</div>
      <span></span>
    </div>
  );
};

export default Select;
