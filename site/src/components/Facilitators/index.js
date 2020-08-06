import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import user_icon from "../../assets/user_icon.png";
import "./style.scss";

const users = [
  {
    profilePic: "",
    firstName: "Eyityo",
    lastName: "Ogunmola",
    occupation: "Data Analyst",
  },
  {
    profilePic: "",
    firstName: "Rex",
    lastName: "Ogunmola",
    occupation: "Data positionist",
  },
  {
    profilePic: "",
    firstName: "Amos",
    lastName: "Oruaroghene",
    occupation: "Data Analyst",
  },
];

const Facilitators = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(0);

  return (
    <div className="fac_xc">
      <TransitionGroup className="fac_xc_con flex-row j-start">
        <CSSTransition
          classNames="slide"
          key={`fac_sec_${currentUser}`}
          timeout={500}
        >
          <div className="fac_xc_sec flex-row j-start">
            <div className="img-sec">
              <img
                src={users[currentUser].profilePic || user_icon}
                alt=""
                className="img cover"
              />
            </div>
            <div className="text_sec">
              <p>Instructors</p>
              <h2>{`${users[currentUser].firstName} ${users[currentUser].lastName}`}</h2>
              <h3>Data Analyst</h3>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div className="dots_con flex-row">
        {users.map((index, i) => (
          <button
            className="dot_button flex-row"
            key={i}
            onClick={() => setCurrentUser(i)}
          >
            <span
              className="dot"
              data-active={i === currentUser ? "active" : null}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Facilitators;
