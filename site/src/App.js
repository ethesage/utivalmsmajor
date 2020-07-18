import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import Loader from "./components/Loader";
import "./App.css";

const HomePage = lazy(() => import("./views/HomePage"));
const Auth = lazy(() => import("./views/Auth"));
const Purchase = lazy(() => import("./views/Purchase"));

function App() {
  return (
    <main className="App">
      <Router>
        <Loader />
        <Suspense fallback={<Loader tempLoad={true} />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/quickcheckout/:course" component={Auth} />
            <Route exact path="/signin" component={Auth} />
            <Route exact path="/signup" component={Auth} />
            <Route exact path="/forgot" component={Auth} />
            <Route exact path="/reset-password" component={Auth} />
            <Route exact path="/purchase" component={Purchase} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default hot(module)(App);
