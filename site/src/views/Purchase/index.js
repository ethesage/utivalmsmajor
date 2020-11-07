import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Details from "./Details";
import Payment from "./Payment";
import "./style.scss";

const Purchase = (props ) => {
  // console.log(props, '.....')
  const [currentPage, setPage] = useState(0);
  const [id, setId] = useState(0)

  const pages = [<Details proceed={setPage} match={props.match} set={setId}/>, <Payment back={setPage} corhortId={id}/>];
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

      <h2 className="hd middle">Purchase Course</h2>
      <div className="purchase_con">
        <div className="nav flex-row">
          <div data-active={currentPage === 0} className="nav-item">
            <p className="theme-color">Program Brief</p>
          </div>

          <div data-active={currentPage === 1} className="nav-item">
            <p className="theme-color">Payment Method</p>
          </div>
        </div>
        <div>{pages[currentPage]}</div>
      </div>
    </main>
  );
};

export default Purchase;
