import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import category from 'data/categories';
// import card from 'assets/icons/card.png';
// import paystack from 'assets/icons/paystack.png';
// import Paystack from './Paystack';
// import Paypal from './Paypal';
import Flutterwave from "./Flutterwave";
// import paypal from 'assets/icons/paypal.png';
import approved from "assets/approved.png";
import { checkout } from 'g_actions/courses';
import { addStudentCourse } from 'g_actions/mainCourse';
// import Card from './Card';
import "./style.scss";

// const course = category[0].data[0];

const Payment = ({ back, id }) => {
  // const [current, setPage] = useState(0);
  const { push } = useHistory();
  const disRef = useRef();

  const dispatch = useDispatch();
  const { auth, courses } = useSelector((state) => state);

  // const dispatch = useDispatch();

  useEffect(() => {
    if (courses?.purchaseCourse?.type === 'free') {
    
      dispatch(checkout(courses.purchaseCourse.CourseCohorts[0].id))
      dispatch(
        addStudentCourse(courses.purchaseCourse, [
          { courseCohortId: courses.purchaseCourse.CourseCohorts[0].id },
        ])
      );
      done()
    }
  }, [])

  const goBack = () => {
    back(0);
  };

  function done() {
    disRef.current.showModal();
  }

  // const handleClick = () => {};

  return (
    <div className="payment container">
      <dialog ref={disRef} className="d_s_c">
        <div className="content flex-col">
          <img src={approved} alt="approved" />
          <div className="reg_text">
            <h2 className="hd">Successful</h2>
            <p>Your payment is successful</p>
          </div>

          <button className="btn flex-row" onClick={() => push(`/courses/overview/${courses.purchaseCourse.CourseCohorts[0].id}`)}>
            Start Learning
          </button>
        </div>
      </dialog>
      <div className="payment_con mx-auto txt-center">
        {/* <nav className="nav-sec flex-row j-space">
          <div className="nav-item">
            <img src={card} alt="card" />
          </div>
          <div className="nav-item">
            <img src={paystack} alt="paystack" />
          </div>
          <div className="nav-item">
            <img src={paypal} alt="paypal" />
          </div>
        </nav> */}

        {/* <div className="flex-row card-sec"> */}
        {/* <Card done={done} /> */}

        {/* <Paystack done={done} /> */}
        <p>Pay using</p>
        {courses.purchaseCourse.type !== "free" && <Flutterwave done={done} />}
        {/* <Paypal done={done} /> */}

        {/* </div> */}

        <button className="back" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Payment;
