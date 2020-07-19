import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "../../components/Loader";
import SideBar from "../../components/SideBar";
import "./style.scss";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const openBar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const close = () => {
      setOpen(false);
    };

    const closeSlider = () => {
      const smallerScreen = window.matchMedia("(max-width: 800px)");

      if (smallerScreen.matches) {
        close();
      } else {
      }
    };

    window.addEventListener("resize", closeSlider);
    window.addEventListener("scroll", close);
    return () => {
      window.removeEventListener("resize", closeSlider);
      window.removeEventListener("scroll", close);
    };
  }, []);

  return (
    <main className="dashboard">
      <Router>
        <Loader />
        <aside className={`dh-aside ${open ? " open" : ""}`}>
          <SideBar />
        </aside>
        <section className="dh-main">
          <Suspense fallback={<Loader tempLoad={true} />}>
            <Switch>
              {/* <Route exact path="/" component={HomePage} /> */}
            </Switch>
          </Suspense>
        </section>
      </Router>
    </main>
  );
};

export default Dashboard;
