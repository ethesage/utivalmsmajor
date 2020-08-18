import React, { useRef, useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useInput from '../../../Hooks/useInput';
import data from '../../../data/passwords_reset';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../helpers';
import '../style.scss';

function Reset() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
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
    <div className="profile password flex-row al-start j-space box-shade">
      <div className="form_sec">
        <form className="form">
          <p className='title'>Change Password</p>
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
