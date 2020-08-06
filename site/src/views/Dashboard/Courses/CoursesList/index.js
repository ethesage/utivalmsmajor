import React from "react";
import { Link } from "react-router-dom";
import { Progress } from "react-sweet-progress";
import img1 from "../../../../assets/homepage/img1.png";
import medal from "../../../../assets/icons/medal.png";
import "react-sweet-progress/lib/style.css";
import "./style.scss";

const CousreCard = () => {
  return (
    <div className="p_cx_cd">
      <Link className="img-sec" to={`/dashboard/courses/233456/overview`}>
        <img src={img1} alt="" className="img cover" />
      </Link>
      <div className="txt-sec">
        <div className="title_sec flex-row j-space">
          <h3 className="theme-color">Data Accelerator</h3>
          <img src={medal} alt="" />
        </div>

        <div>
          <small>Completion level</small>
          <Progress
            className="slim"
            percent={40}
            status="error"
            theme={{
              success: {
                symbol: "‍",
                color: "rgb(223, 105, 180)",
              },
              error: {
                symbol: "40%",
                color: "red",
              },
              default: {
                symbol: "😱",
                color: "#fbc630",
              },
            }}
          />
        </div>
        <div className="grade flex-row j-space">
          <small>
            <strong>Grade:</strong> 100
          </small>
          <button>
            <small>View Details</small>
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  return (
    <>
      <nav className="nav_cux">
        <Link to="/dashboard/courses" className="reg_text">
          <h3>My Courses</h3>
        </Link>
      </nav>
      <section className="course_list">
        <CousreCard />
      </section>
    </>
  );
};

export default CourseList;
