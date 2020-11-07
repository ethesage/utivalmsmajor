import React, { useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useInput from 'Hooks/useInput';
import Input from 'components/Input';
import Button from 'components/Button';
import data from 'data/signIn';
import { axiosInstance } from 'helpers';
import { login } from 'g_actions/user';
import Social from '../SocialSec';
import '../style.scss';

function Login() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      const response = await axiosInstance.post('/user/login', inputs);
      addToast(`Welcome back ${response.data.user.firstName}`, {
        appearance: 'success',
        autoDismiss: true,
      });

      dispatch(login());
      response.data.user.role === 'admin'
        ? history.push('/admin')
        : history.push('/');
    },
    btnText: {
      loading: 'Logging on...',
      reg: 'Login',
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="auth_section">
      <div className="reg_text">
        <h2>Sign In</h2>
        <p>
          To use another email address,{' '}
          <Link to="/signin">
            <strong className="theme-color">click here</strong>
          </Link>
        </p>
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
            attr={form.attr}
          />
        ))}

        <Button
          btnRef={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row"
          text="Login"
        />
      </form>
      <div className="externs flex-row j-space">
        <small>
          Forgot password?{' '}
          <Link to="/auth/forgot">
            <strong className="theme-color">Click here</strong>
          </Link>
        </small>
        <small>
          Don't have an account?{' '}
          <Link to="/auth/signup">
            <strong className="theme-color">Sign up</strong>
          </Link>
        </small>
      </div>
      <Social />
    </div>
  );
}

export default Login;
