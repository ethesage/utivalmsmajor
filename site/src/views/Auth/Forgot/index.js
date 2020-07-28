import React, { useRef, useState } from "react";
import Input from "../../../components/Input";
import useInput from "../../../Hooks/useInput";
import data from "../../../data/forgot";
import Button from "../../../components/Button";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../helpers";
import "../style.scss";

function QuickCheckout() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      const response = await axiosInstance.post("/user/login", inputs);
      addToast(`Welcome back ${response.data.user.firstName}`, {
        appearance: "success",
        autoDismiss: true,
      });
    },
    btnText: {
      loading: "Sending...",
      reg: "Send reset Link",
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="auth_section">
      <div className="reg_text">
        <h2>Forgot Password?</h2>
        <p>Enter your email and we will send you a reset Link</p>
      </div>
      <form className="form">
        {data.map((form, i) => (
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

        <Button
          btnRef={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row"
          text="Send reset link"
        />
      </form>
      <div className="externs flex-row j-space">
        <small>
          Don't have an account?{" "}
          <Link to="/signup">
            <strong className="theme-color">Sign up</strong>
          </Link>
        </small>
      </div>
    </div>
  );
}

export default QuickCheckout;
