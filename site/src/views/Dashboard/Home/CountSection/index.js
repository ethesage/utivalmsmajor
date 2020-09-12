import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CountCard from 'components/CountCard';
import course from 'assets/icons/dashboard/course.png';
import completed from 'assets/icons/dashboard/completed.png';
import ongoing from 'assets/icons/dashboard/ongoing.png';
import { countDetails } from 'g_actions/student';

const d_data = [
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
];

const CountSection = () => {
  const counts = useSelector((state) => state.student.counts);
  const dispatch = useDispatch();

  const stateCount =
    counts && d_data.map((pre) => ({ ...pre, num: counts[pre.link] }));

  const [data, setData] = useState(stateCount || d_data);

  useEffect(() => {
    (async () => {
      await dispatch(countDetails());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!counts) return;

    setData((prev) => prev.map((pre) => ({ ...pre, num: counts[pre.link] })));

    return () => {};
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
