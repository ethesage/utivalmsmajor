import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { purchaseCourse } from '../../g_actions/courses';
import Modal from 'components/Modal';
import Paymentcard from 'views/Purchase/Payment';
import './style.scss';
import Details from 'views/Purchase/Details';

const PaymentComp = ({ full, paymentComplete, details }) => {
  const paymentModal = useRef();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [payNow, setPayNow] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showPaymentCompleteDialog, setShowPaymentCompleteDialog] = useState(
    false
  );

  useEffect(() => {
    if (!(details && paymentComplete)) {
      if (full) {
        setShowPaymentCompleteDialog(true);
      } else {
        setTimeout(() => {
          setShowPaymentCompleteDialog(true);
        }, 5000);
      }
    }
  }, [details, full, paymentComplete]);

  const closeDialog = () => {
    setShowPaymentCompleteDialog(false);
  };

  const pay = () => {
    dispatch(purchaseCourse(Details));
    setPayNow(true);
    paymentModal.current.open();
  };

  const closeModal = () => {
    paymentModal.current.close();
  };

  const FinishPayment = () => {
    setComplete(true);
    setPayNow(false);
    showPaymentCompleteDialog(false);
  };

  const runOnClose = () => {
    if (!complete) return;
    window.location.reload();
  };

  return (
    <>
      {showPaymentCompleteDialog && (
        <div className="payment_comp">
          <div>
            <h1>Hello {user.firstName},</h1>
            <p>You have not completed the payment for the couse</p>
            <p> please click on the button below to complete your payment</p>
            <button className="pay" onClick={pay}>
              Pay Now
            </button>
            <button className="close" onClick={closeDialog}>
              x
            </button>
          </div>
        </div>
      )}
      <Modal ref={paymentModal} runOnClose={runOnClose}>
        {payNow && (
          <Paymentcard
            fromSplit
            paymentAmount={details.courseAmount - details.amountPaid}
            mainText={
              <div style={{ marginBottom: '40px' }}>
                <h1>Hi, {user.firstName}</h1>
                <p>
                  Please complete your final payment of{' '}
                  {details.courseAmount - details.amountPaid} using
                </p>
              </div>
            }
            back={closeModal}
            doneFunc={FinishPayment}
          />
        )}
        {complete && (
          <div className="py-modal">
            <p>Payment complete</p>
            <p onClick={runOnClose}>Click here to continue learning</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PaymentComp;
