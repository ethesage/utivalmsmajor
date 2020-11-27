import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFlutterwave } from "react-flutterwave";
import { checkout } from "g_actions/courses";
import paystack from "assets/icons/Flutterwave.png";
import { addStudentCourse, addTransaction } from "g_actions/mainCourse";

export default ({ done }) => {
  const dispatch = useDispatch();
  const { auth, courses } = useSelector((state) => state);

  const config = {
    public_key: "FLWPUBK-e836e7b389eda0faa7c37b9c12fb4119-X",
    // public_key: "FLWPUBK_TEST-676fa99372c8af0bcb924e15ad1de6d6-X",
    tx_ref: Date.now(),
    amount: Number(courses.checkoutData.cost),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: auth.user.email,
      // phonenumber: '08102909304',
      name: auth.user.firstName + " " + auth.user.lastName,
    },
    customizations: {
      // title: 'My store',
      description: "Course Payment",
      logo: `${window.location.origin}/assets/logo.png`,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="flutter_btn">
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              // console.log(response);

              if (response.status === "successful") {
                dispatch(checkout(courses.checkoutData.CourseCohorts[0].id));
              dispatch(
                addStudentCourse(courses.checkoutData, [
                  { courseCohortId: courses.checkoutData.CourseCohorts[0].id },
                ])
              );
              dispatch(
                addTransaction({
                  email: auth.user.email,
                  name: response.customer.name,
                  currency: response.currency,
                  paidAmount: `${response.amount}`,
                  courseAmount: courses.checkoutData.cost,
                  status: response.status,
                  transactionId: `${response.transaction_id}`,
                  tnxRef: `${response.tx_ref}`,
                  studentId: auth.user.id,
                  courseId: courses.checkoutData.id,
                  courseCohortId: courses.checkoutData.CourseCohorts[0].id,
                })
              );
              done();
              }
            },
            onClose: () => {},
          });
        }}
      >
        <img
          src={paystack}
          style={{ marginBottom: "20px", width: "200px" }}
          alt="paystack button"
        />
      </button>
    </div>
  );
};
