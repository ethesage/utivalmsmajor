import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import {
  getAllCourseCohorts,
  addCourseCohort,
  editCourseCohort,
} from "g_actions/admin";
import Button from "components/Button";
import getCurrentCourse from "Hooks/getCCAdmin";
import Loading from "components/Loading";
import Nav from "components/AdminHeader";
import useFetch from "Hooks/useFetch";
import AllCohorts from "components/AllCohorts";
import Modal from "components/Modal";
import data from "data/createCohort";
import Input from "components/InputType";
import useInput from "Hooks/useInput";
import { axiosInstance } from "helpers";
// import not_found from 'assets/not_found.png';
import "./style.scss";

const filterDate = (date) => {
  const dates = date.split(" - ");

  const endDateYear = parseInt(dates[1].split(" ")[2]);
  const endDateMonth = moment.monthsShort().indexOf(dates[1].split(" ")[0]) + 1;
  const endDateDate = parseInt(dates[1].split(" ")[1]);

  const endDate = `${endDateYear}-${endDateMonth}-${endDateDate}`;

  const startDateDate = parseInt(dates[0].split(" ")[1]);
  const startDateMonth =
    moment.monthsShort().indexOf(dates[0].split(" ")[0]) + 1;

  const monthDiff = endDateMonth - startDateMonth;

  const expectedStartMonthYear = moment(endDate)
    .subtract(monthDiff, "months")
    .format("YYYY");

  return {
    startDate: moment(
      `${expectedStartMonthYear}-${startDateMonth}-${startDateDate}`
    ).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
  };
};

const CourseCohorts = () => {
  const [loading, error, currentCourse] = getCurrentCourse();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { addToast } = useToasts();
  const [currentCohort, setCurrentCohort] = useState(null);
  const { cohorts } = useSelector((state) => state.admin);
  const [c_loading, c_error, fetch] = useFetch(
    dispatch,
    !!!cohorts[currentCourse?.name]
  );
  const submitButton = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (!currentCourse) return;
    if (cohorts[currentCourse.name]) return;

    fetch(() => getAllCourseCohorts(courseId, currentCourse.name));

    return () => {};
  }, [cohorts, fetch, courseId, currentCourse]);

  const btnText = currentCohort
    ? { loading: "Editing...", reg: "Edit" }
    : {
        loading: "Creating...",
        reg: "Create",
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
    initials: {},
    btnText,
    cb: async (inputs) => {
      const startDate = moment(new Date(inputs.startDate)).format("MMM Do");
      const endDate = moment(new Date(inputs.endDate)).format("MMM Do YYYY");

      const newInputs = {
        dateRange: `${startDate} - ${endDate}`,
        cohort: inputs.cohort,
        folderId: inputs.folderId,
        courseId,
        expiresAt: new Date(inputs.endDate),
        paymentType: inputs.paymentType,
      };

      const resp = !currentCohort
        ? await axiosInstance.post(`/cohort/addcourse`, newInputs)
        : await axiosInstance.patch(`/cohort/courseCohort/update`, {
            ...newInputs,
            courseCohortId: currentCohort.id,
          });

      addToast(`Successfully ${currentCohort ? "Edited" : "Created"} `, {
        appearance: "success",
        autoDismiss: true,
      });

      submitButton.current.children[0].innerHTML = btnText.reg;
      submitButton.current.classList.remove("loader");

      currentCohort
        ? dispatch(editCourseCohort(resp.data.data, currentCourse.name))
        : dispatch(addCourseCohort(resp.data.data, currentCourse.name));
      modalRef.current.close();
    },
  });

  useEffect(() => {
    if (!currentCohort) return;

    const data = {
      cohort: currentCohort.Cohort.cohort,
      startDate: filterDate(currentCohort.dateRange).startDate,
      endDate: filterDate(currentCohort.dateRange).endDate,
      paymentType: currentCohort.paymentType,
      folderId: currentCohort.folderId,
    };

    setInputTypes(
      Object.keys(inputTypes).reduce(
        (acc, input) => ({
          ...acc,
          [input]: data[input] ? data[input] : "",
        }),
        {}
      )
    );

    modalRef.current.open();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCohort]);

  console.log(currentCohort);

  if (loading || c_loading) {
    return (
      <section className="al_clx">
        <Loading tempLoad={true} full={false} />
      </section>
    );
  }

  if (error || c_error) {
    return (
      <div>
        <p>An Error Occured</p>
      </div>
    );
  }

  const sanitizeModal = () => {
    setCurrentCohort(null);
    setInputTypes(
      Object.keys(inputTypes).reduce(
        (acc, input) => ({
          ...acc,
          [input]: "",
        }),
        {}
      )
    );
  };

  const openModal = () => modalRef.current.open();
  const closeModal = () => modalRef.current.close();

  return (
    <section className="al_clx">
      <Nav
        title={currentCourse?.name}
        text="Create New Cohort"
        onClick={openModal}
      ></Nav>

      <div>
        <AllCohorts
          data={cohorts[currentCourse.name]}
          thumbnail={currentCourse.thumbnail}
          setCurrentCohort={setCurrentCohort}
        />
      </div>

      <Modal ref={modalRef} runOnClose={sanitizeModal}>
        <div className="creat_crs box-shade">
          <Nav>
            <div className="al_nav_sec flex-row j-space">
              <h3>New Cohort </h3>
            </div>
          </Nav>

          <form className="">
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
                handleSelect={handleChange}
                validateSelf={validateSelf}
                inputs={form.select}
                label={form.label}
                showAsterix={false}
                types={form.types}
              />
            ))}

            <div className="flex-row j-end btn_sec">
              <p className="cl" onClick={closeModal}>
                Cancel
              </p>
              <Button
                btnRef={submitButton}
                onClick={handleSubmit}
                className="s_btn flex-row"
                text={currentCohort ? "Edit" : "Create"}
              />
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default CourseCohorts;
