import React, { useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dialogPolyfill from "dialog-polyfill";
import QuickCheckout from "views/Auth/QuickCheckout";
// import category from 'data/categories';
// import card from 'assets/icons/card.png';
// import paystack from 'assets/icons/paystack.png';
// import Paystack from './Paystack';
// import Paypal from './Paypal';
// import Flutterwave from './Flutterwave';
// import Stripe from './Stripe'
// import paypal from 'assets/icons/paypal.png';
import approved from "assets/approved.png";
import { checkout } from "g_actions/courses";
import { addStudentCourse } from "g_actions/mainCourse";
// import Card from './Card';
// import './style.scss';

// const course = category[0].data[0];

const Payment = ({ back, id }) => {
  // const [current, setPage] = useState(0);
  const { push } = useHistory();
  const location = useLocation()
  const disRef = useRef();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);

  console.log(user, courses);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkout(courses.checkoutData.CourseCohorts[0].id));
  //   dispatch(
  //     addStudentCourse(courses.checkoutData, [
  //       {
  //         courseCohortId: courses.checkoutData.CourseCohorts[0].id,
  //       },
  //     ])
  //   );
  //   dispatch(
  //     addTransaction({
  //       email: auth.user.email,
  //       name: auth.user.firstName + " " + auth.user.firstName,
  //       currency: "USD",
  //       paidAmount: `${(courses.checkoutData.cost * 100) / 380}`,
  //       courseAmount: (courses.checkoutData.cost * 100) / 380,
  //       status: "SUCCESSFUL",
  //       transactionId: `${"123"}`,
  //       tnxRef: `${"123"}`,
  //       studentId: auth.user.id,
  //       courseId: courses.checkoutData.id,
  //       courseCohortId: courses.checkoutData.CourseCohorts[0].id,
  //     })
  //   );
  // }, []);

  // useEffect(() => {
  //   if (courses?.purchaseCourse?.type === 'free') {
  //     // if (courses?.purchaseCourse?.type !== 'free') {
  //     dispatch(checkout(courses.purchaseCourse.CourseCohorts[0].id));
  //     dispatch(
  //       addStudentCourse(courses.purchaseCourse, [
  //         { courseCohortId: courses.purchaseCourse.CourseCohorts[0].id },
  //       ])
  //     );
  //     done();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
console.log(location)
  const goBack = () => {
    back(0);
  };

  function done() {
    typeof disRef?.current?.showModal !== "function" &&
      dialogPolyfill.registerDialog(disRef.current);

    if (disRef.current.open) return;
    disRef.current.showModal();
  }

  useEffect(() => {
    done();
  }, []);
  // const handleClick = () => {};

  return (
    <main className="purchase  flex-row j-start">
      // <div className="purchase_con flex-row j-start">
        {/* // <div className="payment container flex-row j-start"> */}
          <dialog ref={disRef} className="d_s_c flex-row j-start" style={{border: 0}}>
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
                    `/courses/overview/${location.pathname.split('payment/')[1]}`
                  )
                }
              >
                Start Learning
              </button>
            </div>
          </dialog>
        {/* // </div> */}
      // </div>
    </main>
  );
};

export default Payment;
