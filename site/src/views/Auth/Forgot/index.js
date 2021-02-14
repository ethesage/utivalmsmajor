import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from 'components/Input';
import useInput from 'Hooks/useInput';
import data from 'data/forgot';
import Button from 'components/Button';
import { useToasts } from 'react-toast-notifications';
import { axiosInstance } from 'helpers';
import '../style.scss';
import './style.scss';

function QuickCheckout() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const [sent, setSent] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      const response = await axiosInstance.post('/user/reset_password_link', {
        ...inputs,
        email: inputs.email.toLowerCase(),
      });
      if (response) {
        addToast(`A password reset link has been sent to your email`, {
          appearance: 'success',
          autoDismiss: true,
        });
        submitButton.current.children[0].innerHTML = 'Resend';
        submitButton.current.classList.remove('loader');
      }
      setSent(true);
      document.querySelector('body').classList.remove('spinner3');
    },
    btnText: {
      loading: 'Sending...',
      reg: 'Send reset Link',
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="auth_section forgot">
      {!sent ? (
        <>
          <div className="reg_text flex-col al-start">
            <h2>
              Forgot Password{' '}
              <span role="img" aria-label="key emoji">
                🔑
              </span>
            </h2>

            <div className="w-full flex-row j-space">
              <p>
                <span role="img" aria-label="smiling emoji">
                  😀
                </span>{' '}
                Yes, we understand things like this happens
              </p>
            </div>
          </div>
          <form className="form">
            {data.map((form, i) => (
              <Input
                key={`login_form_${i}`}
                name={form.name}
                type={form.type}
                placeHolder={form.placeHolder}
                label={form.label}
                value={inputTypes[form.name]}
                errorMsg={form.errorMsg}
                required={form.required}
                reviel={form.type === 'password' ? reviel : false}
                revielPassword={revielPassword}
                handleChange={handleChange}
                validateSelf={validateSelf}
              />
            ))}

            <div
              className="btn_sec_sm flex-row j-end"
              style={{ marginBottom: '20px' }}
            >
              <Button
                btnRef={submitButton}
                onClick={handleSubmit}
                className="s_btn flex-row"
                text="Submit"
              />{' '}
            </div>
          </form>
          <div className="externs flex-row j-space">
            <small>
              In any case remember the password?{' '}
              <span role="img" aria-label="thinking emoji">
                🤔
              </span>{' '}
              <a href="/auth/signin">
                <strong className="theme-color">Sign in</strong>
              </a>
            </small>
          </div>{' '}
        </>
      ) : (
        <>
          <div className="reg_text flex-col al-start submitted">
            <h2>
              Password Reset{' '}
              <span role="img" aria-label="key emoji">
                🔑
              </span>
            </h2>
          </div>

          <p className="sm">
            A password resent link hasbeen sent to{' '}
            <div>
              <strong className="theme-color">{inputTypes.email}</strong>
            </div>
            Kindly check your inbox or spam folder
          </p>

          <a
            href={`https://${inputTypes.email.split('@')[1]}`}
            target="_"
            className="btn sm flex-row"
          >
            <p>Check Mail</p>
          </a>

          <p className="mb-20 sm">
            Didn’t get the mail?{' '}
            <strong
              className="theme-color"
              onClick={(e) => {
                document.querySelector('body').classList.add('spinner3');
                handleSubmit(e);
              }}
            >
              Resend
            </strong>
          </p>

          <p className="mb-20 sm">
            Wrong email address?{' '}
            <strong
              className="theme-color"
              onClick={() => {
                setSent(false);
                history.push('/auth/forgot');
              }}
            >
              Change email address
            </strong>
          </p>

          <button ref={submitButton} style={{ display: 'none' }}>
            <p></p>
          </button>

          <small className="warn">
            <span role="img" aria-label="warning emoji">
              ⚠️
            </span>{' '}
            To keep you account safe, don’t share your password with anyone
          </small>
        </>
      )}
    </div>
  );
}

export default QuickCheckout;
