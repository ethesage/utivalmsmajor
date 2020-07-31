import React from "react";
import Button from "../../../components/Button";
import CountSection from "./CountSection";
import Classes from "../../../components/Classes";
import Files from "../../../components/Files";
import Activities from "../../../components/Activities";
import Welcome from "./Welcome";
import CourseCard from "../../../components/CourseCard";
import categories from "../../../data/categories";
import "./style.scss";

const InfoSec = ({ txt, children }) => (
  <div className="c_card large flex-col">
    <nav className="c_card_nav flex-row j-space reg_text">
      <h2>{txt}</h2>
      <p>View All {txt}</p>
    </nav>
    {children}
  </div>
);

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
        <CountSection />
      </div>

      <div className="p_sec flex-row j-space">
        <InfoSec txt="Classes">
          <Classes />
        </InfoSec>

        <InfoSec txt="Files">
          <Files />
        </InfoSec>

        <InfoSec txt="Activities">
          <Activities />
        </InfoSec>
      </div>

      <div className="course-section">
        <nav className="cs_nav flex-row j-space reg_text">
          <h2>Top Skills People are Learning</h2>
          <p>View all courses</p>
        </nav>

        <div className="flex-col al-start">
          {categories[0].data.map((course, i) => (
            <CourseCard data={course} size="small" key={`current_cate_${i}`} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
