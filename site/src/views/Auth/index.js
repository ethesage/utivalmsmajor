import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import QuickCheckout from './QuickCheckout';
import SignIn from './Login';
import SignUp from './SignUp';
import Forgot from './Forgot';
import Reset from './Reset';
import logo from 'assets/logo_white.png';
import man from 'assets/auth/man.png';
import './style.scss';

const Auth = () => {
  const { path } = useRouteMatch();

  return (
    <main className="auth flex-col">
      <div className="nav container flex-row j-space">
        <a href="https://utiva.io">
          <img src={logo} alt="logo" />
        </a>

        <p>The future of learning</p>
      </div>
      <div className="card container flex-row">
        <div className="pages flex-row al-end">
          <div className="auth-con">
            <Switch>
              <Route exact path={`${path}/signin`} component={SignIn} />
              <Route exact path={`${path}/signup`} component={SignUp} />
              <Route
                exact
                path={`${path}/quickcheckout/:courseCohortId`}
                component={QuickCheckout}
              />
              <Route exact path={`${path}/forgot`} component={Forgot} />
              <Route exact path={`${path}/reset-password`} component={Reset} />
              <Route component={SignIn} />
            </Switch>
          </div>
          <div className="img-sec">
            <img src={man} alt="man" className="img block contain" />
          </div>
        </div>
      </div>
      <div className="ftr container flex-row">
        <p>
          By continuing, you agree to Utiva’s Terms of Use, Privacy Policy, and
          to receive promotional materials from Utiva.
        </p>
      </div>
    </main>
  );
};

export default Auth;
