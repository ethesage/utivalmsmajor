import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader';
import Loader from './components/Loading';
import Protected from './components/Protected';
import AProtected from './components/Protected/AdminProtected';
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
  const time = useRef();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (err) {
        if (
          window.location.href.includes('signin') ||
          window.location.href.includes('signup')
        )
          return;

        if (err.response && err.response.status === 401) {
          if (time.current) return;
          time.current = setTimeout(() => {
            addToast('Session expired, please login again', {
              appearance: 'error',
              autoDismiss: true,
            });
            window.location.href = `/auth/signin?redirect=${window.location.pathname}`;
          }, 5);
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
