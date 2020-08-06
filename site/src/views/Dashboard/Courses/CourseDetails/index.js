import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Overview from "../../../../components/OverView";
import Classroom from "../../../../components/Classroom";
import StudyPlan from "../../../../components/StudyPlan";
import Members from "../../../../components/Members";
import "./style.scss";

const links = [
  { link: "overview", title: "Overview" },
  { link: "classroom", title: "Classroom" },
  { link: "study-plan", title: "Study Plan" },
  { link: "members", title: "Members" },
];

const CourseDetails = () => {
  const { courseId, section } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!courseId && section) {
      history.push("/dashboard/courses");
    }

    return () => {};
  }, []);

  const [pages] = useState({
    overview: <Overview />,
    classroom: <Classroom />,
    "study-plan": <StudyPlan />,
    members: <Members />,
  });

  return (
    <>
      <nav className="nav_cux flex-row j-start">
        <Link to="/dashboard/courses" className="reg_text">
          <h3>My Courses</h3>
        </Link>
        <span>
          <strong>{">"}</strong>
        </span>
        <Link to="/dashboard/courses" className="reg_text">
          <h3>Data Accelerator</h3>
        </Link>
      </nav>{" "}
      <section className="cx_det">
        <nav className="cx_det__nav">
          <ul className="flex-row j-space">
            {links.map((link, i) => (
              <li
                key={`nav_cx_${i}`}
                className="cx_nav_item"
                data-active={link.link === section}
              >
                <Link to={`/dashboard/courses/${courseId}/${link.link}`}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='cx_pages'>{pages[section]}</div>
      </section>
    </>
  );
};

export default CourseDetails;
