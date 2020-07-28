import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import Loader from "./components/Loader";
import Protected from "./components/Protected";
import "./App.css";

const HomePage = lazy(() => import("./views/HomePage"));
const Auth = lazy(() => import("./views/Auth"));
const Purchase = lazy(() => import("./views/Purchase"));
const Dashboard = lazy(() => import("./views/Dashboard"));

function App() {
  return (
    <main className="App">
      <Router>
        <Loader />
        <Suspense fallback={<Loader tempLoad={true} />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/quickcheckout/:course" component={Auth} />
            <Route path="/signin" component={Auth} />
            <Route path="/signup" component={Auth} />
            <Route path="/forgot" component={Auth} />
            <Route path="/reset-password" component={Auth} />
            <Route path="/purchase" component={Purchase} />
            <Protected path="/dashboard" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default hot(module)(App);
