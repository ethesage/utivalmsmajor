import React, { useRef, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../Layouts/MainView';
import Courses from './Courses';
import FAQ from '../FAQ';
import Home from './Home';
import Files from '../Files';
import Settings from '../Settings';
import './style.scss';

const Dashboard = () => {
  const layoutRef = useRef();

  const [gapi, setGapi] = useState(layoutRef.current);

  useEffect(() => {
    setGapi(layoutRef.current);

    return () => {};
  }, []);

  return (
    <Layout ref={layoutRef} type="admin">
      <Switch>
        <Route exact path="/admin">
          <Home gapi={gapi} />
        </Route>
        <Route path="/admin/courses">
          <Courses gapi={gapi} />
        </Route>
        <Route exact path="/admin/faqs/:info?">
          <FAQ />
        </Route>
        {/* <Route exact path="/files">
          <Files gapi={gapi} />
        </Route> */}
        <Route exact path="/admin/settings">
          <Settings />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Dashboard;
