import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Classes from "../Classes";
import ResourceBtn from "../../ResourceButton";
import assignment from "../../../assets/icons/course/assignment.png";
import "./style.scss";

const _data = [
  {
    title: "Jude",
    name: "Week one - SQL For Data",
  },
  {
    title: "Jude violet",
    name: "Week Two - SQL For Data",
  },
  {
    title: "Jude chinoso",
    name: "Week Three - SQL For Data",
  },
  {
    title: "Jude okuwanyi",
    name: "Week Four - SQL For Data",
  },
];

function FullClass({ data = _data }) {
  const { courseId, index } = useParams();
  const [currentCourse, setCurrentCourse] = useState(index.split("_")[1]);

  useEffect(() => {
    setCurrentCourse(index.split("_")[1]);

    return () => {};
  }, [index]);

  return (
    <div className="cx_listnx_full flex-row j-start al-start">
      <div className="side_list">
        <ul>
          {data.map((unused, i) => (
            <li>
              <NavLink
                className="side_link"
                to={`/dashboard/courses/classroom/full/${courseId}/week_${i}`}
              >
                Week {i + 1}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Classes data={data[currentCourse]} />
        <div className="btns">
          <div className="reg_text">
            <h4>Activities</h4>
            <div className="btn_sec_con flex-row j-start">
              <div className="btn_sec">
                <ResourceBtn
                  img={assignment}
                  text="Submit Assignment"
                  color="approved"
                  link={`/dashboard/courses/assignment/${courseId}/${index}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="prev_courses"></div>
      </div>
    </div>
  );
}
export default FullClass;
