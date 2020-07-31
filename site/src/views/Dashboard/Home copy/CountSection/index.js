import React, { useState } from "react";
import course from "../../../../assets/icons/dasboard/course.png";
import completed from "../../../../assets/icons/dasboard/completed.png";
import ongoing from "../../../../assets/icons/dasboard/ongoing.png";

const CountCard = ({ data: { title, num, img } }) => (
  <div className="c_card count flex-col al-start j-start">
    <p className="c_title">{title}</p>
    <div className="c_img-sec flex-row j-space">
      <p>{num}</p>
      <div className="img_con">
        <img src={img} alt="course" />
      </div>
    </div>
  </div>
);

const CountSection = () => {
  const [data, setData] = useState([
    {
      title: "Total Courses",
      num: 1,
      img: course,
    },
    {
      title: "Ongoing Courses",
      num: 1,
      img: ongoing,
    },
    {
      title: "Completed Courses",
      num: 1,
      img: completed,
    },
  ]);

  return (
    <>
      {data.map((_data, i) => (
        <CountCard data={_data} key={`course_count_card${i}`} />
      ))}
    </>
  );
};

export default CountSection;
