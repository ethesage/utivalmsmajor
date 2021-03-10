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

const Payment = ({ back, paymentAmount, mainText, doneFunc, fromSplit }) => {
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
    if (doneFunc) {
      doneFunc();
      return;
    }

    if (disRef.current.open) return;
    disRef.current.open();
  }

  return (
    <div className="payment container">
      {/* <dialog ref={disRef} className="d_s_c"> */}
      <Modal ref={disRef}>
        <div className="d_content flex-col">
          <img src={approved} alt="approved" />
          <div className="reg_text">
            <h2 className="hd">Successful</h2>
            <p>Your payment is successful</p>
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
      {user ? (
        <div className="payment_con mx-auto txt-center">
          {mainText || (
            <p className="con_msg">
              Congratulations! Continue your payment using
            </p>
          )}

          {courses.purchaseCourse.type !== 'free' && (
            <>
              <Flutterwave
                done={done}
                paymentAmount={paymentAmount}
                back={fromSplit ? () => back() : () => {}}
              />

              <Stripe
                done={done}
                paymentAmount={paymentAmount}
                back={fromSplit ? () => back() : () => {}}
              />
            </>
          )}

          <small className="theme-color">
            Please note that we recommend using Flutterwave if you are using a
            naira card
          </small>

          <button className="back" onClick={goBack}>
            Back
          </button>
        </div>
      ) : (
        <div className="flex-row">
          <QuickCheckout />
        </div>
      )}
    </div>
  );
};

export default Payment;
