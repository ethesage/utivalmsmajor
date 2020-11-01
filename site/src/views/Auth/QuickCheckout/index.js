import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "components/Input";
import useInput from "Hooks/useInput";
import Button from "components/Button";
import data from "data/quickCheckout";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { axiosInstance } from "helpers";
import { login } from "g_actions/user";
import Social from "../SocialSec";
import "../style.scss";

function QuickCheckout({ match }) {
  const submitButton = useRef();
  const dispatch = useDispatch();
  const [reviel, setReviel] = useState(false);
  const [pass, setPass] = useState(false);
  const { addToast } = useToasts();
  const { push } = useHistory();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      if (!pass) {
        try {
          const response = await axiosInstance.post("/user/quickcheckout", {
            fullName: inputs.fullName,
            email: inputs.email,
          });
          if (response.data.user.message === "Registration is successful")
            setPass(true);

            addToast(`Your Password has been sent to ${response.data.user.email}`, {
              appearance: "success",
              autoDismiss: false,
            });
          submitButton.current.children[0].innerHTML = "Login";
          submitButton.current.classList.remove("loader");
        } catch (e) {
          if (e.response?.data.error === "User Already Exist") setPass(true);

          submitButton.current.children[0].innerHTML = "Login";
          submitButton.current.classList.remove("loader");
        }
      } else {
        const response = await axiosInstance.post("/user/login", {
          password: inputs.password,
          email: inputs.email,
        });

        addToast(`Welcome back ${response.data.user.firstName}`, {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(login());
      push(`/purchase/${match.params.courseCohortId}`)
        console.log(response);
      }
      // console.log(response.data.user.message);

      
      // console.log(response);
      // push("/");
    },
    btnText: {
      loading: "Submitting...",
      reg: "Submit",
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="auth_section">
      <div className="reg_text">
        <h2>Quick Check Out</h2>
        <p>
          Already have an account?{" "}
          <Link to="/signin">
            <strong className="theme-color">Sign in</strong>
          </Link>
        </p>
      </div>
      <form className="form">
        {data.slice(0, 2).map((form, i) => (
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
        {pass && (
          <Input
            key={`login_form_pass`}
            name={data[2].name}
            type={data[2].type}
            placeHolder={data[2].placeHolder}
            value={inputTypes[data[2].name]}
            errorMsg={data[2].errorMsg}
            required={pass}
            reviel={pass ? reviel : false}
            revielPassword={revielPassword}
            handleChange={handleChange}
            validateSelf={validateSelf}
          />
        )}

        <Button
          btnRef={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row input-div"
          text="Submit"
        />
      </form>
      <Social />
    </div>
  );
}

export default QuickCheckout;
