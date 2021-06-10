import React, { useRef, useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useInput from '../../../Hooks/useInput';
import data from '../../../data/passwords_reset';
import { useToasts } from 'react-toast-notifications';
import { axiosInstance } from '../../../helpers';
import '../style.scss';

function Reset() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    btnText: {
      loading: 'Reseting...',
      reg: 'Reset',
    },
    cb: async (inputs, setInputTypes) => {
      if (inputs.password !== inputs.cpassword) {
        addToast(`Please make sure that the passwords are the same`, {
          appearance: 'error',
          autoDismiss: true,
        });

        submitButton.current.children[0].innerHTML = 'Reset';
        submitButton.current.classList.remove('loader');
        return;
      }

      if (inputs.password === inputs.oldPassword) {
        addToast(
          `Please make sure that the new password is different from the old one`,
          {
            appearance: 'error',
            autoDismiss: true,
          }
        );

        submitButton.current.children[0].innerHTML = 'Reset';
        submitButton.current.classList.remove('loader');
        return;
      }

      const data = Object.keys(inputs).reduce((acc, input) => {
        if (input !== 'cpassword') {
          return { ...acc, [input]: inputs[input] };
        }
        return { ...acc };
      }, {});

      await axiosInstance.patch('/user/login_reset', data);
      submitButton.current.children[0].innerHTML = 'Reset';
      submitButton.current.classList.remove('loader');

      setInputTypes({
        oldPassword: '',
        password: '',
        cpassword: '',
      });

      addToast(`Your password has been reset`, {
        appearance: 'success',
        autoDismiss: true,
      });
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="profile password flex-row al-start j-space box-shade">
      <div className="form_sec">
        <form className="form">
          <p className="title">Change Password</p>
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
            className="s_btn flex-row mx-auto"
            text="Reset"
          />
        </form>
      </div>
    </div>
  );
}

export default Reset;
