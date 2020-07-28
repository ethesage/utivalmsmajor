import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import man from "../../assets/auth/man.png";
import QuickCheckout from "./QuickCheckout";
import SignIn from "./Login";
import SignUp from "./SignUp";
import Forgot from "./Forgot";
import Reset from "./Reset";
import logo from "../../assets/logo.png";
import "./style.scss";

const pages = {
  quickcheckout: <QuickCheckout />,
  signin: <SignIn />,
  signup: <SignUp />,
  forgot: <Forgot />,
  "reset-password": <Reset />,
};

const Auth = () => {
  const location = useLocation();
  //   const params = useParams();
  const [page, setPage] = useState("signup");

  //   console.log(location);

  useEffect(() => {
    const pathname = location.pathname.split("/")[1];
    setPage(pathname);
    return () => {};
  }, [location]);

  return (
    <main className="auth flex-col">
      <div className="nav container flex-row j-start">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="card container flex-row">
        <div className="img-sec">
          <img src={man} alt="" className="img contain" />
        </div>
        <div className={`pages flex-row ${page}`}>{pages[page]}</div>
      </div>
      <div className="ftr container flex-row">
        <p>
          By continuing, you agree to Utiva’s Terms of Use, Privacy Policy, and
          to receive promotional materials from Utiva.
        </p>
      </div>
    </main>
  );
};

export default Auth;
