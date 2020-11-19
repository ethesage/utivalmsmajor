import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from 'Layouts/MainView';
import Courses from './Courses';
import Home from './Home';
import Students from '../Students';
import Trainers from '../Trainers';
import Admins from '../Admins';
import Settings from '../Settings';
import './style.scss';

const Dashboard = () => {
  const Routes = ({ gapi }) => (
    <Switch>
      <Route exact path="/admin">
        <Home gapi={gapi} />
      </Route>
      <Route path="/admin/courses">
        <Courses gapi={gapi} />
      </Route>

      <Route path="/admin/users">
        <Students />
      </Route>

      <Route path="/admin/trainers">
        <Trainers />
      </Route>

      <Route path="/admin/admins">
        <Admins />
      </Route>

      <Route exact path="/admin/settings">
        <Settings />
      </Route>
    </Switch>
  );

  return (
    <Layout type="admin">
      <Routes />
    </Layout>
  );
};

export default Dashboard;
