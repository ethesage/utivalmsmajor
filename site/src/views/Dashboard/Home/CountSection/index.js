import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../../helpers';
import useGoogle from '../../../../Hooks/useGoogle';
// import drive from '../../../../helpers/drive';
import course from '../../../../assets/icons/dasboard/course.png';
import completed from '../../../../assets/icons/dasboard/completed.png';
import ongoing from '../../../../assets/icons/dasboard/ongoing.png';

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
      title: 'Total Courses',
      link: 'course',
      num: 0,
      img: course,
    },
    {
      title: 'Ongoing Courses',
      num: 0,
      link: 'ongoing',
      img: ongoing,
    },
    {
      title: 'Completed Courses',
      num: 0,
      link: 'completed',
      img: completed,
    },
  ]);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get('/student/all/dashboard');

      setData((prev) =>
        prev.map((pre) => ({ ...pre, num: response.data.data[pre.link] }))
      );
    })();
  }, []);

  return (
    <>
      {data.map((_data, i) => (
        <CountCard data={_data} key={`course_count_card${i}`} />
      ))}
    </>
  );
};

export default CountSection;
