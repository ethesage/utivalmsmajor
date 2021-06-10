import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  addCourseDescription,
  updateCourseDescription,
  deleteCourseDescription,
} from 'g_actions/admin';
import Modal from 'components/Modal';
import useInput from 'Hooks/useInput';
import Input from 'components/Input';
import data from 'data/classDiscrip';
import deleteIcon from 'assets/icons/delete.png';
import EditIcon from 'assets/icons/edit.js';
import { axiosInstance } from 'helpers';
import './style.scss';

const AddDes = ({ editedDisp, reset, courseName, close }) => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
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

  if (submitButton.current) {
    submitButton.current.children[0].innerHTML = btnText.reg;
  }

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

      const method = editMode ? 'patch' : 'post';

      const courseDescrip = await axiosInstance[method](slug, {
        title: inputs.title,
        description: inputs.description,
        courseId,
      });

      editMode
        ? dispatch(updateCourseDescription(courseDescrip.data.data, courseName))
        : dispatch(addCourseDescription(courseDescrip.data.data, courseName));

      addToast(editMode ? 'Successfully Edited' : 'Successfully Created', {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = btnText.reg;
      submitButton.current.classList.remove('loader');
      close();
    },
  });

  useEffect(() => {
    setInputTypes(editedDisp);

    return () => {};
  }, [editedDisp, setInputTypes]);

  return (
    <form className="">
      <h3> {editMode ? 'Edit' : 'Add New'}</h3>
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
            Clear Form
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
        className="flex-row img bt"
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
  const dispatch = useDispatch();

  const modalRef = useRef();

  const edit = (classr) => {
    modalRef.current.open();
    setSingleDisp(classr);
  };

  const resetForm = () => {
    setSingleDisp({
      title: '',
      description: '',
    });
  };

  const close = () => {
    modalRef.current.close();
  };

  const deleteDesc = async (disc) => {
    document.querySelector('body').classList.add('spinner1');

    await dispatch(deleteCourseDescription(disc, courseName));

    document.querySelector('body').classList.remove('spinner1');
  };

  return (
    <div className="lnx">
      <div className="over_view">
        {/* <nav className="flex-row j-end">
          <Button text="Update" className="flex-row" />
        </nav> */}

        <div className="list_info">
          <div className="flex-row j-space head">
            <h2>What Student Will Learn</h2>

            <p className="edit" onClick={() => modalRef.current.open()}>
              Add New
            </p>
          </div>
          {descrip?.map((classr, i) => (
            <div className="list" key={`descriptors_${i}`}>
              <span className="flex-row">
                <p>{i + 1}</p>
              </span>
              <div>
                <nav className="">
                  <h3>{classr.title}</h3>
                  <div className="flex-row icon-sec">
                    <button className="flex-row" onClick={() => edit(classr)}>
                      <EditIcon />
                    </button>
                    <button
                      className="flex-row"
                      onClick={() => deleteDesc(classr)}
                    >
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </div>
                </nav>
                <p>{classr.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal ref={modalRef} runOnClose={resetForm}>
        <AddDes
          editedDisp={singleDisp}
          reset={setSingleDisp}
          courseName={courseName}
          close={close}
        />
      </Modal>
    </div>
  );
};

export default Edit;
