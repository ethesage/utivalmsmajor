import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countDetails } from 'g_actions/member';
import { position_labeled_pie } from 'helpers/visuals';

const CountSection = () => {
  const counts = useSelector((state) => state.member.counts);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // await dispatch(countDetails());
    })();
  }, [dispatch]);

  useEffect(() => {
    // if (!counts) return;

    const p_actual = [
      {
        name: 'a',
        value: 30,
      },
      {
        name: 'b',
        value: 100 - 30,
      },
    ];

    position_labeled_pie(p_actual, 'live_att', '');
    position_labeled_pie(p_actual, 'live_att_2', '');

    return () => {};
  }, [counts]);

  return (
    <section>
      <h4 className="font-semibold mb-3">Your Performance</h4>
      <div className="bg-white w-full flex-center p-2">
        <div className="flex -mx-3.5 flex-wrap max-w-7xl">
          <div className="stu_main flex-center flex-col">
            <h4>Live Class Attendance</h4>
            <div id="live_att"></div>
          </div>
          <div className="stu_main flex-center flex-col">
            <h4>Assessment</h4>
            <div className="flex-center flex-col">
              <h3 className="text-4xl text-theme font-bold">70.5%</h3>
              <small>AVERAGE SCORE</small>
            </div>
          </div>
          <div className="stu_main flex-center flex-col">
            <h4>Forum Engagment</h4>
            <div id="live_att_2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountSection;
