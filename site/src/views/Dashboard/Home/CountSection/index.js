import React, { useState, useEffect } from 'react';
import { axiosInstance } from 'helpers';
// import drive from '../../../../helpers/drive';
import CountCard from 'components/CountCard';
import course from 'assets/icons/dashboard/course.png';
import completed from 'assets/icons/dashboard/completed.png';
import ongoing from 'assets/icons/dashboard/ongoing.png';

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
