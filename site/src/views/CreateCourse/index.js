import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { axiosInstance, toBase64 } from 'helpers';
import Loader from 'components/Loading';
import { addCourse, editCourse } from 'g_actions/admin';
import getCurrentCourse from 'Hooks/getCCAdmin';
import useInput from 'Hooks/useInput';
import Nav from 'components/InnerHeader';
import data from 'data/createCourse';
import Button from 'components/Button';
import Input from 'components/InputType';
import './style.scss';

const CreateCourse = ({ edit }) => {
  const submitButton = useRef();
  const { courseId } = useParams();
  const { addToast } = useToasts();
  const { currentCourse } = useSelector((state) => state.admin);
  const [imgSrc, setImgSrc] = useState(
    courseId ? currentCourse?.thumbnail || null : null
  );
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const image = useRef();
  const dispatch = useDispatch();
  const [loading, error] = getCurrentCourse();

  useEffect(() => {
    (async () => {
      const selects = await axiosInstance.get('/admin/cat-names');

      setCategories(selects.data.data.categories);
      setLevels(selects.data.data.levels);
    })();

    return () => {};
  }, []);

  const text = edit
    ? {
        loading: 'Editing...',
        reg: 'Edit',
      }
    : {
        loading: 'Creating...',
        reg: 'Create',
      };

  const [
    handleSubmit,
    handleChange,
    inputTypes,
    validateSelf,
    setInputTypes,
  ] = useInput({
    inputs: data,
    submitButton,
    initials: courseId ? currentCourse || {} : {},
    btnText: text,
    cb: async (inputs) => {
      const formData = new FormData();

      Object.keys(inputs).forEach((input) =>
        formData.append(input, inputs[input])
      );

      const slug = edit ? `/course/update/${courseId}` : '/course/create';
      const method = edit ? 'patch' : 'post';

      const resp = await axiosInstance[method](slug, formData);

      addToast(edit ? 'Successfully Edited' : `Successfully Created`, {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = text.reg;
      submitButton.current.classList.remove('loader');

      edit
        ? dispatch(editCourse(resp.data.data))
        : dispatch(addCourse({ ...resp.data.data.course, CourseCohorts: [] }));
    },
  });

  useEffect(() => {
    if (!currentCourse) return;
    if (!courseId) return;

    setImgSrc(currentCourse.thumbnail);
    setInputTypes(
      Object.keys(inputTypes).reduce(
        (acc, input) => ({
          ...acc,
          [input]: currentCourse[input] ? currentCourse[input] : '',
        }),
        {}
      )
    );

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCourse, setInputTypes]);

  const image_handler = async (e) => {
    const { files } = e.target;
    const _value = await toBase64(files[0]);
    setImgSrc(_value);

    handleChange({ target: { name: 'thumbnail', value: _value } });
  };

  const selects = {
    category: categories,
    level: levels,
  };

  if (loading && courseId) {
    return <Loader tempLoad={true} full={false} />;
  }

  if (error && courseId) {
    return (
      <div className="flex-row">
        <p>An Error Occured</p>
      </div>
    );
  }

  return (
    <section className="cre_cx">
      <Nav>
        <h3 className="cx_hdr">{edit ? 'Edit Course' : 'Create New Course'}</h3>
      </Nav>

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
              inputs={selects[form.name]}
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
          {data.slice(7, 8).map((form, i) => (
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
              name="thumbnail"
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
          text={edit ? 'Edit' : 'Create'}
        />
      </form>
    </section>
  );
};

export default CreateCourse;

// The Data Incubator program of the Data school is designed for early professionals as an immersion program to help kick-start the journey of being a data scientist.
