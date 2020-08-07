import React from "react";
import { useParams } from "react-router-dom";
// import Loader from "../../../components/Loader";
import Classes from "./Classes";
import NavBar from "../../components/CourseNav";
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

const Classroom = ({ data }) => {
  const { courseId, section } = useParams();

  return (
    <>
      <NavBar />
      <section className="cx_listnx">
        {_data.length === 0 ? (
          // <Loader tempLoad={true} height="100%" load={true} />
          <div>...loading</div>
        ) : (
          <div>
            {_data.map((class_room, i) => (
              <Classes
                key={`cx_listnx_${i}`}
                data={class_room}
                i={i}
                courseId={courseId}
                section={section}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Classroom;
