import React, { useState, useEffect } from "react";
import "../Input/style.scss";

const Select = ({
  name,
  placeHolder = "",
  inputs,
  currentText = "",
  handleSelect,
}) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [presentValue, setPresentValue] = useState("");

  const selectRef = React.createRef();

  useEffect(() => {
    setPresentValue(currentText);

    return () => {};
  }, [currentText]);

  const handleClick = (name, value, current_name) => {
    setPresentValue(current_name);
    setOpenDrop(false);
    let target = { name, value };
    handleSelect({ target });
  };

  const revileDropDown = () => {
    setOpenDrop(!openDrop);
  };

  const close = () => {
    setOpenDrop(false);
  };

  const options = inputs.map((input, index) => {
    return (
      <button
        className={`options ${input.value === presentValue ? "selected" : ""}`}
        type="button"
        key={index}
        value={input.value}
        onClick={() => handleClick(name, input.value, input.name)}
      >
        {input.name}
      </button>
    );
  });

  return (
    <div className="input-div" onBlur={close} tabIndex={-1}>
      <div className="input-type">
        <div
          className={`select ${openDrop ? "open-drop" : ""}`}
          ref={selectRef}
        >
          <button
            className={`currentValue ${openDrop ? "open-drop" : ""}`}
            type="button"
            onClick={revileDropDown}
          >
            <p>{presentValue ? presentValue : currentText}</p>
            {/* <img src={rdown} alt='' /> */}
          </button>
          <div
            className={`dropDownButtons ${openDrop ? "open-drop" : "close"}`}
          >
            {options}
          </div>
        </div>

        <label className="place-holder">{placeHolder}</label>
        <span></span>
      </div>
    </div>
  );
};

export default Select;
