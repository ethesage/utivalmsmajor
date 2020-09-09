import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loader from './components/Loading';
import Protected from './components/Protected';
import AProtected from './components/Protected/AdminProtected';
import './App.css';

const HomePage = lazy(() => import('./views/HomePage'));
const Auth = lazy(() => import('./views/Auth'));
const Purchase = lazy(() => import('./views/Purchase'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Admin = lazy(() => import('./views/Admin'));

function App() {
  return (
    <main className="App">
      <Router>
        <Loader />
        <Suspense fallback={<Loader tempLoad={true} full={true} />}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/auth" component={Auth} />
            <Route path="/purchase" component={Purchase} />
            <AProtected path="/admin" component={Admin} type="admin" />
            <Protected path="/" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default hot(module)(App);
