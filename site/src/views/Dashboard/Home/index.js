import React from "react";
import Button from "../../../components/Button";
import Section from "./CountSection";
import Welcome from "./Welcome";
import "./style.scss";

const Home = () => {
  return (
    <main className="dash-con dash-home">
      <div className="com-profile flex-row j-space">
        <p>Your profile is incomplete. Please update your profile</p>

        <Button
          className="p_btn short flex-row"
          link="/dashboard/settings"
          text="Update Profile"
        />
      </div>

      <Welcome />

      <div className="p_sec flex-row j-space">
        <Section />
      </div>

      <div className="p_sec">
        <div className="long">4</div>
        <div className="long">5</div>
        <div className="long">6</div>
      </div>
    </main>
  );
};

export default Home;
