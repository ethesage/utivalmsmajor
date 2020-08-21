import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NavBar from './NavBar';
// import Footer from './Footer'
import SideBar from '../../components/SideBar';
import Courses from './Courses';
import FAQ from '../FAQ';
import Home from './Home';
import Files from '../Files';
import Settings from '../Settings';
import './style.scss';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  let { path, url } = useRouteMatch();

  const openBar = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    const closeSlider = () => {
      const smallerScreen = window.matchMedia('(max-width: 900px)');

      if (smallerScreen.matches) {
        close();
      } else {
      }
    };

    window.addEventListener('resize', closeSlider);
    // window.addEventListener("scroll", close);
    return () => {
      window.removeEventListener('resize', closeSlider);
      window.removeEventListener('scroll', close);
    };
  }, []);

  return (
    <main className="dashboard flex-row al-start">
      <aside className={`dh-aside ${open ? ' open' : ''}`}>
        <SideBar url={url} close={close} />
      </aside>
      <section className="dh-main flex-col">
        <div className="contents flex-col">
          <NavBar open={openBar} grow={open} />
          <Switch>
            <Route exact path={path}>
              <Home />
            </Route>
            <Route path={`${path}/courses`}>
              <Courses />
            </Route>
            <Route path={`${path}/faqs/:info?`}>
              <FAQ />
            </Route>
            <Route path={`${path}/files`}>
              <Files />
            </Route>
            <Route path={`${path}/settings`}>
              <Settings />
            </Route>
          </Switch>
        </div>
        <div className="dash-footer">(c) 2020 Utiva All Rights Reserved</div>
      </section>
    </main>
  );
};

export default Dashboard;
