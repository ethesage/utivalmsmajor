import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../Layouts/MainView';
import Courses from './Courses';
import FAQ from '../FAQ';
import Home from './Home';
import Files from '../Files';
import Settings from '../Settings';
import './style.scss';

const Dashboard = () => {
  const Routes = ({ gapi }) => (
    <Switch>
      <Route exact path="/">
        <Home gapi={gapi} />
      </Route>
      <Route path="/courses">
        <Courses gapi={gapi} />
      </Route>
      <Route exact path="/faqs/:info?">
        <FAQ />
      </Route>
      <Route exact path="/files">
        <Files gapi={gapi} />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
    </Switch>
  );

  return (
    <Layout>
      <Routes />
    </Layout>
  );
};

export default Dashboard;
