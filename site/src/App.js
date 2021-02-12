import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { hot } from 'react-hot-loader';
import Loader from './components/Loading';
import Protected from './components/Protected';
import AProtected from './components/Protected/AdminProtected';
import { log_out } from 'g_actions/user';
import { axiosInstance } from 'helpers';
import './App.css';

const HomePage = lazy(() => import('./views/HomePage'));
const Auth = lazy(() => import('./views/Auth'));
const Purchase = lazy(() => import('./views/Purchase'));
const Payment = lazy(() => import('./views/Payment'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Admin = lazy(() => import('./views/Admin'));
const Courses = lazy(() => import('./views/AllCourses'));

function App() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (err) {
        if (err.response && err.response.status === 401) {
          addToast('Session expired, please login again', {
            appearance: 'error',
            autoDismiss: true,
          });
          dispatch(log_out());

          return;
        } else {
          return Promise.reject(err);
        }
      }
    );
  }, [addToast, dispatch]);

  return (
    <main className="App">
      <Router>
        <Loader />
        <Suspense fallback={<Loader tempLoad={true} full={true} />}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/auth" component={Auth} />
            <Route path="/purchase/:courseCohortId" component={Purchase} />
            <Route path="/payment/:courseCohortId" component={Payment} />
            <AProtected path="/admin" component={Admin} type="admin" />
            <Route path="/all-courses" component={Courses} />
            <Protected path="/" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default hot(module)(App);
