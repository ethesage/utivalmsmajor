import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.png';
import Details from './Details';
import Payment from './Payment';
import './style.scss';

const Purchase = (props) => {
  // console.log(props, '.....')
  const [currentPage, setPage] = useState(0);
  const [id, setId] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState();

  const pages = [
    <Details
      proceed={setPage}
      match={props.match}
      set={setId}
      setPaymentAmount={setPaymentAmount}
    />,
    <Payment back={setPage} corhortId={id} paymentAmount={paymentAmount} />,
  ];
  // const disRef = useRef();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <main className="purchase">
      <div className="nav container flex-row j-start">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="purchase_con">
        <div>{pages[currentPage]}</div>
      </div>
    </main>
  );
};

export default Purchase;
