import React, { useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import getCurrencyRate from "Hooks/getConvertionRate";
import { chargeCard } from "g_actions/courses";
import Modal from "components/Modal";
import sstripe from "assets/icons/stripe.svg";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Stripe = ({ paymentAmount }) => {
  const dispatch = useDispatch();
  const loadsstripe = useRef();
  const { courses } = useSelector((state) => state);

  const [, rate] = getCurrencyRate();

  const handleClick = async (event) => {
    loadsstripe.current.open();
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await dispatch(
      chargeCard({
        amount: Math.round((Number(paymentAmount) * 100) / rate.USD_NGN),
        image: courses.checkoutData.thumbnail,
        courseTitle: courses.checkoutData.name,
        success_url: window.location.href,
        courseCohortId: courses.checkoutData.CourseCohorts[0].id,
      })
    );

    // const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result =
      response &&
      response.data.id &&
      (await stripe.redirectToCheckout({
        sessionId: response.data.id,
      }));

    // console.log(result, "......");

    if (result?.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <>
      <div className="flutter_btn">
        <button type="button" role="link" onClick={handleClick}>
          <img
            src={sstripe}
            style={{
              marginBottom: "20px",
              marginTop: "5px",
              width: "200px",
              height: "40px",
            }}
            alt="paystack button"
          />
        </button>
      </div>
      <Modal ref={loadsstripe} useButton={false}>
        <div
          style={{
            background: "white",
            width: "400px",
            height: "300px",
            textAlign: "center",
            margin: "auto",
            borderRadius: "10px",
          }}
          className="s_btn flex-row loader"
        >
          <p className="loader_con_main">Loading...</p>
        </div>
      </Modal>
    </>
  );
};

export default Stripe;
