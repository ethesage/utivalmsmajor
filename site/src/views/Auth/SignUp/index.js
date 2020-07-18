import React, { useRef, useState } from "react";
import Input from "../../../components/Input";
import useInput from "../../../Hooks/useInput";
import data from "../../../data/signup";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../helpers";
import Select from "../../../components/Select";
import Social from "../SocialSec";
import { minprice, maxprice } from "../../../data/filters";
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

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="auth_section sign_up">
      <div className="reg_text">
        <h2>Create your Account</h2>
        <p>Welcome to the Utiva Learning Platform</p>
      </div>
      <form className="form">
        {data.slice(0, 3).map((form, i) => (
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

        <Select inputs={minprice} currentText="Gender" />
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

        <Select inputs={minprice} currentText="Country" />
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
        ))}

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
