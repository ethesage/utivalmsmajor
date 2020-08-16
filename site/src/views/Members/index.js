import React from "react";
import NavBar from "../../components/CourseNav";
import MemberCard from "../../components/Member";
// import
import "./style.scss";

const StudyPlan = () => {
  return (
    <>
      <NavBar />
      <section className="members">
        <h3>10 Total Members</h3>
        <div className="memx_sec">
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </div>
      </section>
    </>
  );
};

export default StudyPlan;
