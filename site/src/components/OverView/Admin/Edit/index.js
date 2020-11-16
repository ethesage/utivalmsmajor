import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { addCourseDescription, updateCourseDescription } from 'g_actions/admin';
import useInput from 'Hooks/useInput';
import Input from 'components/Input';
import data from 'data/classDiscrip';
import { axiosInstance } from 'helpers';
import './style.scss';
import course from 'g_reducers/member';

const AddDes = ({ editedDisp, reset, courseName }) => {
  const dispatch = useDispatch();
  const editMode = editedDisp.title !== '' || editedDisp.description !== '';
  const submitButton = useRef();
  const { addToast } = useToasts();

  const btnText = editMode
    ? {
        loading: 'Editing...',
        reg: 'Edit',
      }
    : {
        loading: 'Creating...',
        reg: 'Create',
      };

  submitButton.current.children[0].innerHTML = btnText.reg;

  const [
    handleSubmit,
    handleChange,
    inputTypes,
    validateSelf,
    setInputTypes,
  ] = useInput({
    inputs: data,
    submitButton,
    initials: editedDisp,
    btnText,
    cb: async (inputs) => {
      const slug = editMode
        ? `/course/update/description/${editedDisp.id}`
        : `/course/add/description`;

      console.log(inputs);

      const method = editMode ? 'patch' : 'post';

      const courseDescrip = await axiosInstance[method](slug, {
        title: inputs.title,
        description: inputs.description,
      });

      console.log(courseDescrip);

      editMode
        ? dispatch(updateCourseDescription(courseDescrip.data.data, courseName))
        : dispatch(addCourseDescription(courseDescrip.data.data, courseName));

      addToast(editMode ? 'Successfully Edited' : 'Successfully Created', {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = btnText.reg;
      submitButton.current.classList.remove('loader');
    },
  });

  useEffect(() => {
    setInputTypes(editedDisp);

    return () => {};
  }, [editedDisp, setInputTypes]);

  return (
    <form className="">
      {editMode && (
        <button>
          <p
            className="reset"
            onClick={() =>
              reset({
                title: '',
                description: '',
              })
            }
          >
            Reset
          </p>
        </button>
      )}

      {data.map((form, i) => (
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

      <button
        className="flex-row img"
        onClick={handleSubmit}
        ref={submitButton}
      >
        <p> {editMode ? 'Edit' : 'Add New'}</p>
      </button>
    </form>
  );
};

const Edit = ({ descrip, courseName }) => {
  const [singleDisp, setSingleDisp] = useState({
    title: '',
    description: '',
  });

  return (
    <div className="lnx">
      <div className="over_view">
        {/* <nav className="flex-row j-end">
          <Button text="Update" className="flex-row" />
        </nav> */}

        <div className="list_info">
          {descrip.map((classr, i) => (
            <div className="list" key={`descriptors_${i}`}>
              <nav className="flex-row j-space">
                <h3>{classr.title}</h3>
                <p onClick={() => setSingleDisp(classr)}>Edit</p>
              </nav>
              <p>{classr.description}</p>
            </div>
          ))}
        </div>
      </div>

      <AddDes
        editedDisp={singleDisp}
        reset={setSingleDisp}
        courseName={courseName}
      />
    </div>
  );
};

export default Edit;
