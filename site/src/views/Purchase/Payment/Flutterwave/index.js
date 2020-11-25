import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFlutterwave } from "react-flutterwave";
import { checkout } from "g_actions/courses";
import paystack from "assets/icons/Flutterwave.png";
import { addStudentCourse } from "views/Dashboard/Home/action";

export default ({ done }) => {
  const dispatch = useDispatch();
  const { auth, courses } = useSelector((state) => state);

  const config = {
    public_key: "FLWPUBK-e836e7b389eda0faa7c37b9c12fb4119-X",
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
      logo: "https://assets.piedpiper.com/logo.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              // console.log(response);
              done();
              // Implementation for whatever you want to do with reference and after success call.
              dispatch(checkout(courses.checkoutData.courseCohortId));
              dispatch(
                addStudentCourse(courses.checkoutData.courseCohortId, [
                  courses.checkoutData.courseCohortId,
                ])
              );
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
