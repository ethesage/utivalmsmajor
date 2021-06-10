import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import LazyLoad from 'components/SiteLoader';
import Layout from 'Layouts/MainView';
import './style.scss';

const Courses = lazy(() => import('./Courses'));
const Home = lazy(() => import('./Home'));
const Students = lazy(() => import('../Students'));
const Settings = lazy(() => import('../Settings'));

const Dashboard = () => {
  const Routes = () => (
    <Suspense fallback={<LazyLoad />}>
      <Switch>
        <Route exact path="/admin">
          <Home />
        </Route>

        <Route path="/admin/courses">
          <Courses />
        </Route>

        <Route path="/admin/users">
          <Students />
        </Route>

        <Route path="/admin/settings">
          <Settings />
        </Route>
      </Switch>
    </Suspense>
  );

  return (
    <Layout type="admin">
      <Routes />
    </Layout>
  );
};

export default Dashboard;
