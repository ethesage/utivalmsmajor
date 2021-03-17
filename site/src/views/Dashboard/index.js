import React, { Suspense, lazy } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import LazyLoad from 'components/SiteLoader';
import { useSelector } from 'react-redux';
import Layout from 'Layouts/MainView';
import './style.scss';

const Courses = lazy(() => import('./Courses'));
const FAQ = lazy(() => import('../FAQ'));
const Home = lazy(() => import('./Home'));
const Files = lazy(() => import('../Files'));
const Settings = lazy(() => import('../Settings'));

const Dashboard = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const history = useHistory();

  if (isAdmin) {
    history.push('/admin');
  }

  const Routes = ({ gapi }) => (
    <Suspense fallback={<LazyLoad />}>
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
    </Suspense>
  );

  return (
    <Layout>
      <Routes />
    </Layout>
  );
};

export default Dashboard;
