import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getAllCourseCohorts, addCourseCohort } from 'g_actions/admin';
import Button from 'components/Button';
import getCurrentCourse from 'Hooks/getCCAdmin';
import Loading from 'components/Loader';
import Nav from 'components/InnerHeader';
import useFetch from 'Hooks/useFetch';
import AllCohorts from 'components/AllCohorts';
import Modal from 'components/Modal';
import data from 'data/createCohort';
import Input from 'components/Input';
import useInput from 'Hooks/useInput';
import { axiosInstance } from 'helpers';
// import not_found from 'assets/not_found.png';
import './style.scss';

const CourseCohorts = () => {
  const [loading, error, currentCourse] = getCurrentCourse();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { addToast } = useToasts();
  const { cohorts } = useSelector((state) => state.admin);
  const [c_loading, c_error, fetch] = useFetch(dispatch, !!!cohorts);
  const submitButton = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (cohorts) return;

    fetch(() => getAllCourseCohorts(courseId));

    return () => {};
  }, [cohorts, fetch, courseId]);

  const [handleSubmit, handleChange, inputTypes, validateSelf] = useInput({
    inputs: data,
    submitButton,
    initials: {},
    btnText: {},
    cb: async (inputs) => {
      const formData = new FormData();

      Object.keys(inputs).forEach((input) =>
        formData.append(input, inputs[input])
      );

      const resp = await axiosInstance.post(
        `/course/update/${courseId}`,
        formData
      );

      addToast('Successfully Created', {
        appearance: 'success',
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = 'Create';
      submitButton.current.classList.remove('loader');

      dispatch(addCourseCohort(resp.data.data));
    },
  });

  if (loading || c_loading) {
    return <Loading tempLoad={true} full={false} />;
  }

  if (error || c_error) {
    return (
      <div>
        <p>An Error Occured</p>
      </div>
    );
  }

  return (
    <section className="al_clx">
      <Nav>
        <div className="al_nav_sec flex-row j-space">
          <h3>{currentCourse?.name}</h3>
          <Button
            text="Create New Cohort"
            className="flex-row"
            onClick={() => modalRef.current.open()}
          />
        </div>
      </Nav>

      <div>
        <AllCohorts data={cohorts} thumbnail={currentCourse.thumbnail} />
      </div>

      <Modal ref={modalRef}>
        <div className="creat_crs box-shade">
          <Nav>
            <div className="al_nav_sec flex-row j-space">
              <h3>New Cohort </h3>
            </div>
          </Nav>

          <form className="">
            <div className="sub_fm">
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
            </div>

            <Button
              btnRef={submitButton}
              onClick={handleSubmit}
              className="s_btn flex-row mx-auto"
              text={'Create'}
            />
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default CourseCohorts;
