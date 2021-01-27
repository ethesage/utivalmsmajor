import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dialogPolyfill from "dialog-polyfill";
import QuickCheckout from "views/Auth/QuickCheckout";
// import category from 'data/categories';
// import card from 'assets/icons/card.png';
// import paystack from 'assets/icons/paystack.png';
// import Paystack from './Paystack';
// import Paypal from './Paypal';
import Flutterwave from "./Flutterwave";
import Stripe from "./Stripe";
// import paypal from 'assets/icons/paypal.png';
import approved from "assets/approved.png";
import { checkout } from "g_actions/courses";
import { addStudentCourse } from "g_actions/mainCourse";
// import Card from './Card';
import "./style.scss";

// const course = category[0].data[0];

const Payment = ({ back, id }) => {
  // const [current, setPage] = useState(0);
  const { push } = useHistory();
  const disRef = useRef();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();

  useEffect(() => {
    if (courses?.purchaseCourse?.type === "free") {
      // if (courses?.purchaseCourse?.type !== 'free') {
      dispatch(checkout(courses.purchaseCourse.CourseCohorts[0].id));
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
    typeof disRef?.current?.showModal !== "function" &&
      dialogPolyfill.registerDialog(disRef.current);

    if (disRef.current.open) return;
    disRef.current.showModal();
  }

  return (
    <div className="payment container">
      <dialog ref={disRef} className="d_s_c">
        <div className="content flex-col">
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
      </dialog>
      {user ? (
        <div className="payment_con mx-auto txt-center">
          <p>Congratulations! Continue your paymant using</p>
          {courses.purchaseCourse.type !== "free" && (
            <>
              {courses.purchaseCourse.currency_type === "local" && (
                <Flutterwave done={done} />
              )}
              <Stripe done={done} />
            </>
          )}

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
