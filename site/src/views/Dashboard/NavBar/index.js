import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import hamburger from "../../../assets/icons/hambuger.png";
import notifyIcon from "../../../assets/icons/notify.png";
import { log_out } from "../../../g_actions/user";
import "./style.scss";

const NavBar = ({ open, grow }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="header flex-row al-end">
      <aside className={`dh-aside ${grow ? " open" : ""}`}></aside>
      <nav className="dash-nav flex-col al-start">
        <div className="be-white"></div>
        <div className="nav-contents flex-row j-space">
          <div className="nav-icons flex-row">
            <img className="nav" onClick={open} src={hamburger} alt="" />
            <Link to="/">
              <img className="logo" src={logo} alt="png" />
            </Link>
          </div>

          <div className="info flex-row">
            <div className="bell">
              <img src={notifyIcon} alt="bell" className="img contain" />
            </div>

            <button
              onClick={(e) => {
                dispatch(log_out());
                history.push("/");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
