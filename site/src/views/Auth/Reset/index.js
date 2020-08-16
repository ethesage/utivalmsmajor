import React, { useRef, useState } from 'react';
import Input from '../../../components/Input';
import useInput from '../../../Hooks/useInput';
import data from '../../../data/reset';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../helpers';
import '../style.scss';

function QuickCheckout() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: {
      email: '',
      password: '',
    },
    submitButton,
    cb: async (inputs) => {
      const response = await axiosInstance.post('/user/login', inputs);
      addToast(`Welcome back ${response.data.user.firstName}`, {
        appearance: 'success',
        autoDismiss: true,
      });
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="auth_section">
      <div className="reg_text">
        <h2>Reset your password</h2>
        <p>One last step and you'll be on your way</p>
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
            reviel={form.type === 'password' ? reviel : false}
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
          <p>Reset</p>
        </button>
      </form>
      <div className="externs flex-row j-space">
        <small>
          Don't have an account?{' '}
          <Link to="/auth/signup">
            <strong className="theme-color">Sign up</strong>
          </Link>
        </small>
      </div>
    </div>
  );
}

export default QuickCheckout;
