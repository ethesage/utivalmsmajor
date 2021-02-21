import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuickCheckout from 'views/Auth/QuickCheckout';
import Flutterwave from './Flutterwave';
import Stripe from './Stripe';
import approved from 'assets/approved.png';
import { checkout } from 'g_actions/courses';
import { addStudentCourse } from 'g_actions/mainCourse';
import Modal from 'components/Modal';
import './style.scss';

const Payment = ({ back, paymentAmount }) => {
  const { push } = useHistory();
  const disRef = useRef();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (courses?.purchaseCourse?.type === 'free') {
      dispatch(
        checkout(courses.purchaseCourse.CourseCohorts[0].id),
        paymentAmount
      );
      dispatch(
        addStudentCourse(courses.purchaseCourse, [
          { courseCohortId: courses.purchaseCourse.CourseCohorts[0].id },
        ])
      );
      done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    back(0);
  };

  function done() {
    if (disRef.current.open) return;
    disRef.current.open();
  }

  disRef.current.open();

  return (
    <div className="payment container mx-auto">
      {/* <dialog ref={disRef} className="d_s_c"> */}
      <Modal ref={disRef}>
        <div className="flex flex-col p-7 bg-white rounded w-4/5 mx-auto max-w-lg">
          <img src={approved} alt="approved" className="w-full" />
          <div className="reg_text mb-5">
            <h2 className="text-theme font-semibold mt-10 mb-1">Successful</h2>
            <p className="text-txt text-sm">Your payment is successful</p>
          </div>

          <button
            className="btn flex-row"
            onClick={() =>
              push(
                `/courses/overview/${courses.purchaseCourse.CourseCohorts[0].id}`
              )
            }
          >
            Start Learning
          </button>
        </div>
      </Modal>
      {/* {true ? ( */}
      {user ? (
        <div className="payment_con mx-auto text-center w-full max-w-2xl rounded-md md:py-8 md:px-5">
          <p className="con_msg">
            Congratulations! Continue your paymant using
          </p>

          {courses.purchaseCourse.type !== 'free' && (
            <>
              <Flutterwave done={done} paymentAmount={paymentAmount} />

              <Stripe done={done} paymentAmount={paymentAmount} />
            </>
          )}

          <small className="text-theme font-semibold text-xs">
            Please note that we recommend using Flutterwave if you are using a
            naira card
          </small>

          <button
            className="mt-12 text-theme font-semibold text-center w-full"
            onClick={goBack}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="flex-row max-w-sm">
          <QuickCheckout />
        </div>
      )}
    </div>
  );
};

export default Payment;
