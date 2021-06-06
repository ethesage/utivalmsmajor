import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { purchaseCourse } from '../../g_actions/courses';
import Modal from 'components/Modal';
import Paymentcard from 'views/Purchase/Payment';
import Details from 'views/Purchase/Details';
import { format_comma } from 'helpers';

const PaymentComp = ({ full, paymentComplete, details }) => {
  const paymentModal = useRef();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [payNow, setPayNow] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showPaymentCompleteDialog, setShowPaymentCompleteDialog] =
    useState(false);

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
        <div className="border-l-4 border-approved fixed top-5 right-5 w-64 bg-white z-50 p-1.5 shadow">
          <div className="relative text-sm">
            <h1 className="mb-2.5 font-semibold">Hello {user.firstName},</h1>
            <p className="mb-2.5">
              You have not completed the payment for the couse
            </p>
            <p className="mb-2.5">
              please click on the button below to complete your payment
            </p>
            <button
              className="bg-approved w-full text-white p-1.5 rounded-sm"
              onClick={pay}
            >
              Pay Now
            </button>
            <button
              className="absolute top-0 w-6 h-6 right-0 rounded-full text-base cursor-pointer z-40"
              onClick={closeDialog}
            >
              x
            </button>
          </div>
        </div>
      )}
      <Modal ref={paymentModal} runOnClose={runOnClose}>
        <div
          className="bg-white rounded-md p-3"
          style={{
            width: '90vw',
            maxWidth: '600px',
          }}
        >
          {payNow && (
            <Paymentcard
              fromSplit
              paymentAmount={details.courseAmount - details.amountPaid}
              mainText={
                <div style={{ marginBottom: '40px' }}>
                  <h1>Hi {user.firstName}</h1>
                  <p>
                    Please complete your final payment of{' '}
                    <strong>
                      ₦{' '}
                      {format_comma(
                        Math.round(details.courseAmount - details.amountPaid)
                      )}{' '}
                    </strong>
                    using
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
        </div>
      </Modal>
    </>
  );
};

export default PaymentComp;
