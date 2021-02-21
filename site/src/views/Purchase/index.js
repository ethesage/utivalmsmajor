import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.png';
import Details from './Details';
import Payment from './Payment';

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
    <main className="purchase min-h-screen">
      <div className="nav container mx-auto flex items-center justify-start h-20">
        <Link to="/">
          <img src={logo} alt="logo" className="w-20" />
        </Link>
      </div>

      <div className="purchase_con flex-grow mt-10">
        <div>{pages[currentPage]}</div>
      </div>
    </main>
  );
};

export default Purchase;
