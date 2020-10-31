import React, { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { axiosInstance, toBase64 } from 'helpers';
import useInput from 'Hooks/useInput';
import data from 'data/createCourse';
import Button from 'components/Button';
import Input from 'components/InputType';
import './style.scss';

const CreateCourse = () => {
  const submitButton = useRef();
  const { addToast } = useToasts();
  const [imgSrc, setImgSrc] = useState();
  const image = useRef();
  // const dispatch = useDispatch();

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

  const image_handler = async (e) => {
    const { files } = e.target;
    const _value = await toBase64(files[0]);
    setImgSrc(_value);
  };

  return (
    <section className="cre_cx">
      <h1 className="cx_hdr">Create New Course</h1>

      <form className="">
        <div className="sub_fm">
          {data.slice(0, 2).map((form, i) => (
            <Input
              key={`login_form_${i}`}
              name={form.name}
              type={form.type}
              itype={form.itype}
              placeHolder={form.placeHolder}
              value={inputTypes[form.name]}
              errorMsg={form.errorMsg}
              required={form.required}
              handleChange={handleChange}
              validateSelf={validateSelf}
              inputs={form.select}
              label={form.label}
              showAsterix={false}
            />
          ))}
        </div>
        <div className="sub_fm sec_2">
          {data.slice(2, 5).map((form, i) => (
            <Input
              key={`login_form_${i}`}
              name={form.name}
              type={form.type}
              itype={form.itype}
              placeHolder={form.placeHolder}
              value={inputTypes[form.name]}
              errorMsg={form.errorMsg}
              required={form.required}
              handleChange={handleChange}
              validateSelf={validateSelf}
              inputs={form.selects}
              handleSelect={handleChange}
              label={form.label}
              showAsterix={false}
            />
          ))}
        </div>
        <div className="sub_fm sec_3">
          {data.slice(5, 7).map((form, i) => (
            <Input
              key={`login_form_${i}`}
              name={form.name}
              type={form.type}
              itype={form.itype}
              placeHolder={form.placeHolder}
              value={inputTypes[form.name]}
              errorMsg={form.errorMsg}
              required={form.required}
              handleChange={handleChange}
              validateSelf={validateSelf}
              inputs={form.select}
              label={form.label}
              showAsterix={false}
            />
          ))}
        </div>
        <div className="sub_fm sec_4">
          {data.slice(7).map((form, i) => (
            <Input
              key={`login_form_${i}`}
              name={form.name}
              type={form.type}
              itype={form.itype}
              placeHolder={form.placeHolder}
              value={inputTypes[form.name]}
              errorMsg={form.errorMsg}
              required={form.required}
              handleChange={handleChange}
              validateSelf={validateSelf}
              inputs={form.select}
              handleSelect={handleChange}
              label={form.label}
              types={form.types}
            />
          ))}
          <div className="input-div">
            <label className="cximg flex-col al-start" htmlFor="image_profile">
              <div className="img-sec">
                <p>Add cover image</p>
                <img
                  src={imgSrc}
                  alt=""
                  ref={image}
                  className="img cover box-shade"
                />
              </div>
            </label>
            <input
              type="file"
              id="image_profile"
              name="profilePic"
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              onChange={image_handler}
            />
          </div>
        </div>

        <Button
          btnRef={submitButton}
          onClick={handleSubmit}
          className="s_btn flex-row mx-auto"
          text="Create"
        />
      </form>
    </section>
  );
};

export default CreateCourse;
