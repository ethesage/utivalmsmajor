import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CountSection from './CountSection';
import ProfileCheck from 'components/ProfileCheck';
import Layout from 'Layouts/HomeGrid';
import { position_pie, position_bar } from 'helpers/visuals';
import useFetch from 'Hooks/useFetch';
import { getDashdetails } from './action';
import './style.scss';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { dashboard } = useSelector((state) => state.adminHome);
  const dispatch = useDispatch();
  const [loading, , fetch] = useFetch(dispatch, !!!dashboard, true);
  const charts = useRef({});

  useEffect(() => {
    if (loading) {
      fetch(() => getDashdetails());
    }

    return () => {};
  }, [fetch, loading]);

  useEffect(() => {
    if (loading) return;
    if (!dashboard) return;

    if (charts.current['test']) {
      charts.current['test'].dispose();
    }

    charts.current['test'] = position_pie(dashboard.studentByCourse, 'test');

    const chart = charts.current['test'];
    // const data = dashboard

    return () => {
      chart && chart.dispose();
    };
  }, [dashboard, loading]);

  useEffect(() => {
    if (loading) return;
    if (!dashboard) return;

    if (charts.current['test2']) {
      charts.current['test2'].dispose();
    }

    charts.current['test2'] = position_pie(dashboard.trainerByCourse, 'test2');

    const chart = charts.current['test2'];

    return () => {
      chart && chart.dispose();
    };
  }, [dashboard, loading]);

  useEffect(() => {
    if (loading) return;
    if (!dashboard) return;

    if (charts.current['test3']) {
      charts.current['test3'].dispose();
    }

    charts.current['test3'] = position_bar(dashboard.studentByMonth, 'test3');

    const chart = charts.current['test3'];

    return () => {
      chart && chart.dispose();
    };
  }, [dashboard, loading]);

  const Loader = ({ id }) => {
    return (
      <>
        <div className="spinner2 img chart_con"></div>
        <label id={id} style={{ display: 'none' }}></label>
      </>
    );
  };

  const NotFound = () => {
    return (
      <div className="chart_con flex-row">
        <p>No data available yet</p>
      </div>
    );
  };

  return (
    <main className="dash-con dash-home">
      <ProfileCheck user={user} />
      <Layout>
        <CountSection counts={dashboard} />
      </Layout>

      <div className="pie_sec flex-row j-space">
        <div className="anal_con flex-col">
          <div className="nav-sec">
            <p>Student by Course</p>
          </div>
          {loading ? (
            <Loader />
          ) : dashboard.studentByCourse.length === 0 ? (
            <NotFound />
          ) : (
            <div id="test" className="chart_con"></div>
          )}
        </div>

        <div className="anal_con flex-col">
          <div className="nav-sec">
            <p>Trainers by Course</p>
          </div>
          {loading ? (
            <Loader />
          ) : dashboard.studentByCourse.length === 0 ? (
            <NotFound />
          ) : (
            <div id="test2" className="chart_con"></div>
          )}
        </div>
      </div>

      <div className="bar_sec">
        <div className="anal_con flex-col">
          <div className="nav-sec flex-row j-space">
            <p>Student enrollment per month</p>
          </div>
          {loading ? (
            <Loader />
          ) : dashboard.studentByCourse.length === 0 ? (
            <NotFound />
          ) : (
            <div id="test3" className="chart_con"></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
