import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import approved from "assets/approved.png";
import "./style.scss";

const PaymentComplete = () => {
  const { push } = useHistory();
  const location = useLocation();

  return (
    <main className="purchase_complete flex-row">
      <div className="purchase_con flex-row j-start">
        <div className="content flex-col">
          <img src={approved} alt="approved" />
          <div className="reg_text">
            <p>Your payment is successful</p>
          </div>

          <button
            className="btn flex-row"
            onClick={() =>
              push(
                `/courses/overview/${location.pathname.split("payment/")[1]}`
              )
            }
          >
            Start Learning
          </button>
        </div>
      </div>
    </main>
  );
};

export default PaymentComplete;
