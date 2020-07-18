import React from "react";
import google from "../../../assets/icons/google.png";
import linkedin from "../../../assets/icons/linkedin.png";
import "./style.scss";

const Social = () => {
  return (
    <div className="social">
      <div className="head flex-row">
        <p>Or</p>
      </div>
      <div className="btn_sec flex-row j-space">
        <button className="flex-row j-start">
          <img src={google} alt="google" />
          <p>Google</p>
        </button>
        <button className="flex-row j-start">
          <img src={linkedin} alt="linkedin" />
          <p>LinkedIN</p>
        </button>
      </div>
    </div>
  );
};

export default Social;
