import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { hot } from 'react-hot-loader';
import Login from './views/Auth/Login';
import Forgot from './views/Auth/Forgot';
import QuickCheckout from './views/Auth/QuickCheckout';
import Reset from './views/Auth/Reset';
import SignUp from './views/Auth/SignUp';
import Loader from './components/Loading';
import Protected from './components/Protected';
import AProtected from './components/Protected/AdminProtected';
import { log_out } from 'g_actions/user';
import { axiosInstance } from 'helpers';
import './App.css';

const Purchase = lazy(() => import('./views/Purchase'));
const Payment = lazy(() => import('./views/Payment'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Admin = lazy(() => import('./views/Admin'));
const Courses = lazy(() => import('./views/AllCourses'));
const Home = lazy(() => import('./views/HomePage'));

function App() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (err) {
        if (window.location.href.includes('signin')) return;

        console.log(window.location.href.includes('signin'));

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
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/quickcheckout/:courseCohortId"
              component={QuickCheckout}
            />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/reset-password" component={Reset} />
            <Route path="/purchase/:courseCohortId" component={Purchase} />
            <Route path="/payment/:courseCohortId" component={Payment} />
            <AProtected path="/admin" component={Admin} type="admin" />
            <Route path="/all-courses" component={Courses} />
            <Route path="/formal-home-page" component={Home} />
            <Protected path="/" component={Dashboard} />
            <Route component={Login} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default hot(module)(App);
