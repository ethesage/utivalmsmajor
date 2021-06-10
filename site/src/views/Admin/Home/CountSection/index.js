import React, { useState, useEffect } from 'react';
// import drive from '../../../../helpers/drive';
import course from 'assets/icons/dashboard/course.png';
import CountCard from 'components/CountCard';
import student from 'assets/icons/dashboard/students.png';
import admin from 'assets/icons/dashboard/admin.png';
import trainer from 'assets/icons/dashboard/trainer.png';
// import organization from 'assets/icons/dashboard/organization.png';

const CountSection = ({ counts }) => {
  const [data, setData] = useState([
    {
      title: 'Total Courses',
      link: 'course',
      num: 0,
      img: course,
    },
    {
      title: 'Total Students',
      num: 0,
      link: 'student',
      img: student,
    },
    {
      title: 'Total trainers',
      num: 0,
      link: 'trainer',
      img: trainer,
    },
    {
      title: 'Total Admins',
      num: 0,
      link: 'admins',
      img: admin,
    },
    // {
    //   title: 'Total Organizations',
    //   num: 0,
    //   link: 'completed',
    //   img: organization,
    // },
  ]);

  useEffect(() => {
    (async () => {
      if (!counts) return;

      setData((prev) => prev.map((pre) => ({ ...pre, num: counts[pre.link] })));
    })();
  }, [counts]);

  return (
    <>
      {data.map((_data, i) => (
        <CountCard data={_data} key={`course_count_card${i}`} />
      ))}
    </>
  );
};

export default CountSection;
