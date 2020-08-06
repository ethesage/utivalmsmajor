import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
// import Loader from "../../../components/Loader";
import FullClass from "./FullClass";
import Classes from "./Classes";
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
  const { courseId, section, type, index } = useParams();

  return (
    <section className="cx_listnx">
      {_data.length === 0 ? (
        // <Loader tempLoad={true} height="100%" load={true} />
        <div>...loading</div>
      ) : type !== "full" ? (
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
      ) : (
        <FullClass
          index={index}
          data={_data}
          courseId={courseId}
          section={section}
        />
      )}
    </section>
  );
};

export default Classroom;
