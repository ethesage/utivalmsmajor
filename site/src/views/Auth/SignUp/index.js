import React, { useRef, useState, useEffect } from "react";
import Input from "../../../components/InputType";
import useInput from "../../../Hooks/useInput";
import data from "../../../data/signup";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../helpers";
import Select from "../../../components/Select";
import Social from "../SocialSec";
import { gender, maxprice } from "../../../data/filters";
import axois from "axios";
import "../style.scss";
import "./style.scss";

function QuickCheckout() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      occupation: "",
    },
    submitButton,
    cb: async (inputs) => {
      const response = await axiosInstance.post("/user/login", inputs);
      addToast(`Welcome back ${response.data.user.firstName}`, {
        appearance: "success",
        autoDismiss: true,
      });
    },
  });

  const [selects, setSelects] = useState({
    gender,
    country: [],
    region: [],
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  useEffect(() => {
    const get_countries = async () => {
      let countries = await axois.get(
        "https://restcountries.eu/rest/v2/all?fields=name"
      );

      countries = countries.data.map((country) => ({
        name: country.name,
        value: country.name,
      }));

      setSelects({
        ...selects,
        country: countries,
      });
    };

    get_countries();

    return () => {};
  }, []);

  return (
    <div className="auth_section sign_up">
      <div className="reg_text">
        <h2>Create your Account</h2>
        <p>Welcome to the Utiva Learning Platform</p>
      </div>
      <form className="form">
        {data.map((form, i) => (
          <Input
            key={`login_form_${i}`}
            name={form.name}
            type={form.type}
            itype={form.itype}
            placeHolder={form.itype ? "" : form.placeHolder}
            value={inputTypes[form.name]}
            errorMsg={form.errorMsg}
            required={form.required}
            reviel={form.type === "password" ? reviel : false}
            revielPassword={revielPassword}
            handleChange={handleChange}
            validateSelf={validateSelf}
            inputs={selects[form.name]}
            currentText={form.placeHolder}
            handleSelect={handleChange}
          />
        ))}

        {/* <Select
          inputs={gender}
          currentText="Gender"
          validateSelf={validateSelf}
        />
        {data.slice(3, 6).map((form, i) => (
          <Input
            key={`login_form_${i}`}
            name={form.name}
            type={form.type}
            placeHolder={form.placeHolder}
            value={inputTypes[form.name]}
            errorMsg={form.errorMsg}
            required={form.required}
            reviel={form.type === "password" ? reviel : false}
            revielPassword={revielPassword}
            handleChange={handleChange}
            validateSelf={validateSelf}
          />
        ))}

        <Select inputs={gender} currentText="Country" />
        <Select inputs={[]} currentText="Region" />

        {data.slice(6, 8).map((form, i) => (
          <Input
            key={`login_form_${i}`}
            name={form.name}
            type={form.type}
            placeHolder={form.placeHolder}
            value={inputTypes[form.name]}
            errorMsg={form.errorMsg}
            required={form.required}
            reviel={form.type === "password" ? reviel : false}
            revielPassword={revielPassword}
            handleChange={handleChange}
            validateSelf={validateSelf}
          />
        ))} */}

        <button
          ref={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row input-div"
        >
          <p>Login</p>
        </button>
      </form>
      <div className="externs flex-row j-space">
        <small>
          Already have an account?{" "}
          <Link to="/signin">
            <strong className="theme-color">Login</strong>
          </Link>
        </small>
      </div>
      <Social />
    </div>
  );
}

export default QuickCheckout;
