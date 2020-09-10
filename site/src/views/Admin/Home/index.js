import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CountSection from './CountSection';
import ProfileCheck from 'components/ProfileCheck';
import Layout from 'Layouts/HomeGrid';
import { position_pie, position_bar } from 'helpers/visuals';

import './style.scss';

const Home = ({ gapi }) => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    position_pie([], 'test');
    position_pie([], 'test2');
    position_bar([], 'test3');

    return () => {};
  }, []);

  return (
    <main className="dash-con dash-home">
      <ProfileCheck user={user} />
      <Layout>
        <CountSection />
      </Layout>

      <div className="pie_sec flex-row j-space">
        <div className="anal_con flex-col">
          <div className="nav-sec">
            <p>Student by Course</p>
          </div>
          <div id="test" className="chart_con"></div>
        </div>

        <div className="anal_con flex-col">
          <div className="nav-sec">
            <p>Trainers by Course</p>
          </div>
          <div id="test2" className="chart_con"></div>
        </div>
      </div>

      <div className="bar_sec">
        <div className="anal_con flex-col">
          <div className="nav-sec flex-row j-space">
            <p>Student enrollment per month</p>
          </div>
          <div id="test3" className="chart_con"></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
