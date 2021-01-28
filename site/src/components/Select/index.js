import React, { useState, useEffect } from "react";
import "../Input/style.scss";
import { stringSearch } from "helpers";

const Select = ({
  name,
  placeHolder = "",
  inputs,
  label = "",
  handleSelect = () => {},
  required,
  value = "",
  useSearch = false,
  useArrow = true,
  index,
  attr = {},
  showAsterix = true,
}) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [presentValue, setPresentValue] = useState(value);
  const [presentText, setPresentText] = useState("");
  const [innerInputs, setInnerInputs] = useState(inputs);
  const [searchQuery, setSearchQuery] = useState("");

  const selectRef = React.createRef();
  const parent = React.createRef();

  useEffect(() => {

    const val = innerInputs.find(
      (input) =>
        input.value === value ||
        (typeof input.value === "string" &&
          typeof value === "string" &&
          input.value.toUpperCase() === value.toUpperCase())
    );

    setPresentValue(value);
    setPresentText(
      `${
        val
          ? val.name
          : `${placeHolder}${required ? (showAsterix ? " *" : "") : ""}`
      }`
    );

    return () => {};
  }, [label, required, innerInputs, value, placeHolder, showAsterix]);

  useEffect(() => {
    if (searchQuery !== "") {
      setInnerInputs(
        inputs.filter((input) => stringSearch(searchQuery, input.name))
      );
    } else setInnerInputs(inputs);

    return () => {};
  }, [searchQuery, inputs]);

  const handleClick = (name, value, current_name) => {
    setPresentValue(value);
    setPresentText(current_name);
    setOpenDrop(false);
    let target = { name, value };
    handleSelect({ target });
  };

  const handleChange = (event, error) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const revileDropDown = () => {
    if (attr.disabled) return;
    setOpenDrop(!openDrop);
  };

  const close = (e) => {
    const leavingParent = !parent.current.contains(e.relatedTarget);

    if (leavingParent) {
      // if (presentValue) return;
      setOpenDrop(false);
    }
  };

  const options = innerInputs.map((input, index) => {
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
    <div
      className={`input-div select_op`}
      onBlur={close}
      tabIndex={-1}
      ref={parent}
      {...attr}
    >
      {label && <label className="t_label">{label}</label>}

      <div className="input-type">
        {/* <div className="input-type"> */}
        <div
          className={`select ${
            openDrop || presentValue !== "" ? "open-drop" : ""
          }`}
          ref={selectRef}
          style={{ zIndex: openDrop ? 50 : 10 }}
          tabIndex={-1}
        >
          <button
            className={`currentValue ${openDrop ? "open-drop" : ""}${
              useArrow ? " arrow" : ""
            }`}
            type="button"
            onClick={revileDropDown}
          >
            <p className="clipped-text" style={{ "--number": 1 }}>
              {presentValue ? presentText : placeHolder}
            </p>
          </button>
          <div
            className={`dropDownButtons ${openDrop ? "open-drop" : "close"}`}
          >
            {useSearch ? (
              <div className="search-input">
                <input
                  type="text"
                  placeholder="search"
                  onChange={handleChange}
                  value={searchQuery}
                />
              </div>
            ) : null}
            {options}
          </div>
          {/* </div> */}
        </div>

        {/* <div className="place-holder">{placeHolder}</div> */}
      </div>
    </div>
  );
};

export default Select;
