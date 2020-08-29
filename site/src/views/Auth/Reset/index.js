import React, { useRef, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useInput from '../../../Hooks/useInput';
import data from '../../../data/reset';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../helpers';
import '../style.scss';

function Reset() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const location = useLocation();

  const queries = new URLSearchParams(location.search).toString();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    btnText: {
      loading: 'Reseting...',
      reg: 'Reset',
    },
    cb: async (inputs) => {
      if (inputs.password !== inputs.cpassword) {
        addToast(`Please make sure that the passwords are the same`, {
          appearance: 'error',
          autoDismiss: true,
        });

        submitButton.current.classList.remove('loader');
        return;
      }

      const data = Object.keys(inputs).reduce((acc, input) => {
        if (input !== 'cpassword') {
          return { ...acc, [input]: inputs[input] };
        }
        return { ...acc };
      }, {});

      const response = await axiosInstance.post(
        `/user/change_password?${queries}`,
        data
      );

      if (response) {
        addToast('Successfull updated', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/auth/signin');
      }
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

        <Button
          btnRef={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row input-div"
          text="Reset"
        />
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

export default Reset;
