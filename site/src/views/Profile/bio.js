import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { axiosInstance } from 'helpers';
import useInput from 'Hooks/useInput';
import Button from 'components/Button';
import Input from 'components/InputType';
import { login } from 'g_actions/user';
import data from 'data/profile_bio';
import './style.scss';

const ProfileBio = () => {
  const user = useSelector((state) => state.auth.user);
  const submitButton = useRef();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    initials: user,
    btnText: {
      loading: 'Updating...',
      reg: 'Update',
    },
    cb: async (inputs) => {
      await axiosInstance.patch('/user/update', inputs);

      addToast(`Successfully Updated`, {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = 'Update';
      submitButton.current.classList.remove('loader');

      dispatch(login());
    },
  });

  return (
    <section className="profile bio flex-row al-start j-space box-shade">
      <div className="form_sec">
        <form className="form">
          <h3>Profile Summary</h3>

          <Input
            name={data[0].name}
            type={data[0].type}
            itype={data[0].itype}
            placeHolder={data[0].itype ? '' : data[0].placeHolder}
            value={inputTypes[data[0].name]}
            errorMsg={data[0].errorMsg}
            required={data[0].required}
            handleChange={handleChange}
            validateSelf={validateSelf}
          />
          <small>Max 300 words</small>

          <Input
            name={data[1].name}
            type={data[1].type}
            itype={data[1].itype}
            placeHolder={data[1].itype ? '' : data[1].placeHolder}
            value={inputTypes[data[1].name]}
            errorMsg={data[1].errorMsg}
            required={data[1].required}
            handleChange={handleChange}
            validateSelf={validateSelf}
          />

          <Button
            btnRef={submitButton}
            onClick={handleSubmit}
            className="s_btn flex-row mx-auto"
            text="Update"
          />
        </form>
      </div>
    </section>
  );
};

export default ProfileBio;
