import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { axiosInstance } from 'helpers';
import useInput from 'Hooks/useInput';
import data from 'data/createCourse';
import Button from 'components/Button';
import Input from 'components/InputType';
import './style.scss';

const CreateCourse = () => {
  const submitButton = useRef();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    initials: {},
    btnText: {
      loading: 'Creating...',
      reg: 'Create',
    },
    cb: async (inputs) => {
      await axiosInstance.patch('/user/update', inputs);

      addToast(`Successfully Updated`, {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = 'Create';
      submitButton.current.classList.remove('loader');

      // dispatch(login());
    },
  });

  return (
    <section className="cre_cx">
      <h1 className="cx_hdr">Create New Course</h1>

      <form>
        {data.map((form, i) => (
          <Input
            key={`login_form_${i}`}
            name={form.name}
            type={form.type}
            itype={form.itype}
            placeHolder={form.itype ? '' : form.placeHolder}
            value={inputTypes[form.name]}
            errorMsg={form.errorMsg}
            required={form.required}
            handleChange={handleChange}
            validateSelf={validateSelf}
            inputs={form.select}
            currentText={form.placeHolder}
            handleSelect={handleChange}
            label={form.label}
          />
        ))}

        <Button
          btnRef={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row mx-auto"
          text="Update"
        />
      </form>
    </section>
  );
};

export default CreateCourse;
