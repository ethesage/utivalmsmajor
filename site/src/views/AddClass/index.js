import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import { getAllTrainers } from 'g_actions/trainer';
import { addClass, editClass } from 'g_actions/admin';
import { updateResourceName, createResourceName } from 'g_actions/member';
import TrainerIcon from 'assets/icons/addTrainer';
import Modal from 'components/Modal';
import Input from 'components/Input';
import useInput from 'Hooks/useInput';
import useFetch from 'Hooks/useFetch';
import { axiosInstance } from 'helpers';
import Close from 'assets/icons/closeX';
import user_icon from 'assets/user_icon.png';
import Button from 'components/Button';
import data from 'data/createClass';
import './style.scss';

const AddAssignment = ({ editedClass, edit, name, courseId, mainCohortId }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const submitButton = useRef();
  const modalRef = useRef();
  const allTrainers = useSelector((state) => state.trainers);
  const [loading, , fetch] = useFetch(dispatch, !!!allTrainers);
  const [trainer, setTrainer] = useState(
    editedClass?.Trainer?.User && {
      id: editedClass?.Trainer?.userId,
      firstName: editedClass?.Trainer?.User?.firstName,
      lastName: editedClass?.Trainer?.User?.lastName,
      occupation: editedClass?.Trainer?.User?.occupation,
      profilePic: editedClass?.Trainer?.User?.profilePic,
    }
  );
  const { cohortId } = useParams();

  useEffect(() => {
    if (allTrainers) return;

    fetch(() => dispatch(() => getAllTrainers()));

    return () => {};
  }, [fetch, dispatch, allTrainers]);

  const text = edit
    ? {
        loading: 'Editing...',
        reg: 'Edit',
      }
    : {
        loading: 'Creating...',
        reg: 'Create',
      };

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    initials: edit
      ? {
          ...editedClass,
          date:
            editedClass?.ClassDays[0]?.date &&
            moment(editedClass?.ClassDays[0]?.date).format('YYYY-MM-DD'),
          time: editedClass?.ClassDays[0]?.time,
        } || {}
      : {},
    btnText: text,
    cb: async (inputs) => {
      if (!trainer) {
        submitButton.current.children[0].innerHTML = text.reg;
        submitButton.current.classList.remove('loader');

        return addToast('Please select a trainer', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }

      const slug = edit ? `/class/update/${editedClass.id}` : '/class/create';
      const method = edit ? 'patch' : 'post';
      const s_data = edit
        ? {
            ...inputs,
            userId: trainer.id,
            courseCohortId: cohortId,
            courseId,
            classId: editedClass.id,
            cohortId: mainCohortId,
          }
        : {
            ...inputs,
            userId: trainer.id,
            courseCohortId: cohortId,
            courseId,
            cohortId: mainCohortId,
          };

      const resp = await axiosInstance[method](slug, s_data);

      addToast(edit ? 'Successfully Edited' : `Successfully Created`, {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = text.reg;
      submitButton.current.classList.remove('loader');

      edit
        ? dispatch(editClass(resp.data.data, name))
        : dispatch(addClass(resp.data.data, name));

      if (editedClass?.title !== inputs?.title && edit) {
        dispatch(updateResourceName(editedClass.title, inputs.title));
      } else dispatch(createResourceName(inputs.title));
    },
  });

  const handleImgError = (e) => {
    e.target.src = user_icon;
  };

  const remove = () => {
    setTrainer(null);
  };

  const handleSearch = ({ target: { name, value } }) => {};

  return (
    <div className="add_class cx_listnx_con">
      <form className="flex-row j-start al-start">
        <div className="desc_se">
          <div className={`in_sec`}>
            <div className="sub_fm">
              {data.slice(0, 3).map((form, i) => (
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
          </div>

          <Button
            text={edit ? 'Edit' : 'Create Class'}
            className="flex-row"
            onClick={handleSubmit}
            btnRef={submitButton}
          />
        </div>

        <div className="cx-specs box-shade">
          <div className="pl_sec flex-row">
            <dt>Set Date</dt>
            <div className="sub_fm">
              <Input
                name="date"
                type="date"
                placeHolder=""
                value={inputTypes['date']}
                required={true}
                handleChange={handleChange}
                validateSelf={validateSelf}
                attr={{ min: moment().format('YYYY-MM-DD') }}
                showAsterix={false}
              />
            </div>
          </div>
          <div className="pl_sec flex-row">
            <dt>Set Time</dt>

            <Input
              name="time"
              type="time"
              placeHolder=""
              value={inputTypes['time']}
              required={true}
              handleChange={handleChange}
              validateSelf={validateSelf}
              attr={{ min: moment().format('YYYY-MM-DD') }}
              showAsterix={false}
            />
          </div>
          <div className="pl_sec flex-col">
            <div className="flex-row j-space img">
              <dt>Trainer</dt>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  modalRef.current.open();
                }}
              >
                <TrainerIcon />
              </button>
            </div>

            <div className="trx_con">
              {trainer && (
                <div
                  key={trainer.id}
                  className="trainer flex-row j-start"
                  onClick={() => setTrainer(trainer)}
                >
                  <img
                    src={trainer.profilePic || user_icon}
                    alt="userimage"
                    onError={handleImgError}
                  />
                  <div>
                    <strong>
                      <p>
                        {trainer.firstName} {trainer.lastName}
                      </p>
                    </strong>
                    <small>{trainer.occupation}</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      <Modal ref={modalRef}>
        <div className="choose_tnr flex-col j-start al-start">
          <Input
            placeHolder="Enter a name"
            name="search"
            handleChange={handleSearch}
          />

          <div className="selected flex-row j-start">
            {trainer && (
              <div className="slx_tr">
                <img
                  src={trainer?.profilePic || user_icon}
                  alt=""
                  onError={handleImgError}
                />
                <div className="rmv flex-row" onClick={remove}>
                  <Close />
                </div>
              </div>
            )}
          </div>
          {!loading ? (
            <div className="trx_con">
              <h2>Results</h2>
              {allTrainers?.length === 0 && (
                <p>No trainers on the platform yet</p>
              )}
              {allTrainers?.map((trainer) => (
                <div
                  key={trainer.id}
                  className="trainer flex-row j-start"
                  onClick={() => setTrainer(trainer)}
                >
                  <img
                    src={trainer.profilePic || user_icon}
                    alt="userimage"
                    onError={handleImgError}
                  />
                  <div>
                    <strong>
                      <p>
                        {trainer.firstName} {trainer.lastName}
                      </p>
                    </strong>
                    <small>{trainer.occupation}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="spinner2"
              style={{ height: '100px', width: '100%' }}
            ></div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddAssignment;