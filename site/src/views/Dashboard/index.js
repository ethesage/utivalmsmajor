import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from 'Layouts/MainView';
import Courses from './Courses';
import FAQ from '../FAQ';
import Home from './Home';
import Files from '../Files';
import Settings from '../Settings';
import './style.scss';
// import NavBar from 'components/CourseNav';

const Dashboard = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const history = useHistory();

  if (isAdmin) {
    history.push('/admin');
  }

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
      <Route path="/files">
        <Files gapi={gapi} />
      </Route>
      <Route path="/settings">
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
