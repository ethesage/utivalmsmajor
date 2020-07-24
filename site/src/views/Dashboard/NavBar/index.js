import React from "react";
import logo from "../../../assets/logo.png";
import notifyIcon from "../../../assets/icons/notify.png";
import "./style.scss";

const NavBar = () => {
  return (
    <nav className="dash-nav flex-row j-space">
      <img className="logo" src={logo} alt="png" />

      <div className="info flex-row">
        <div className="bell">
          <img src={notifyIcon} alt="bell" className="img contain" />
        </div>

        <button>Log out</button>
      </div>
    </nav>
  );
};

export default NavBar;
