import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import logo from './logo.svg';
import { usePaystackPayment } from "react-paystack";
import paystack from "../../../../assets/icons/paystack.png";
import { checkout } from "../../../../g_actions/courses";
import { axiosInstance } from "../../../../helpers";
// import './App.css';

const Paystack = ({ done }) => {
  const dispatch = useDispatch();
  const { auth, courses } = useSelector((state) => state);
  console.log(done)

  const config = {
    reference: new Date().getTime(),
    email: auth.user.email,
    amount: Number(courses.checkoutData.cost) * 100,
    publicKey: "pk_test_58bb35af5f694a4b80d0f83f20818cc992508791",
  };

  const onSuccess = (reference) => {
    done();
    // Implementation for whatever you want to do with reference and after success call.
    dispatch(checkout(courses.checkoutData.courseCohortId))
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        <img src={paystack} />
      </button>
    </div>
  );
};

function App({ done }) {
  return (
    <div className="App">
      <Paystack done={done}/>
    </div>
  );
}

export default App;
