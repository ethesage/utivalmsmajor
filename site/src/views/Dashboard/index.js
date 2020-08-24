import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NavBar from './NavBar';
import useGoogle from '../../Hooks/useGoogle';
import SideBar from '../../components/SideBar';
import Courses from './Courses';
import FAQ from '../FAQ';
import Home from './Home';
import Files from '../Files';
import Settings from '../Settings';
import Modal from '../../components/Modal';
import google from '../../assets/icons/google.png';
import './style.scss';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const modalRef = useRef();
  let { path, url } = useRouteMatch();

  const openBar = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  const { g_api, signIn } = useGoogle({ updateSignInStatus });

  function updateSignInStatus(isSignedIn) {
    if (!isSignedIn) modalRef.current.open();
    setSignedIn(isSignedIn);
  }

  const signin = async () => {
    const res = await signIn();
    modalRef.current.close();
    setSignedIn(res);
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
      <Modal ref={modalRef}>
        <section className="g_signup flex-col box-shade">
          <p className="intro">
            To better participate in this course please signin to access google
            drive materials for this course
          </p>
          <button className="flex-row" onClick={signin}>
            <img src={google} alt="google" />
            <p>Google</p>
          </button>
        </section>
      </Modal>
      <aside className={`dh-aside ${open ? ' open' : ''}`}>
        <SideBar url={url} close={close} />
      </aside>
      <section className="dh-main flex-col">
        <div className="contents flex-col">
          <NavBar open={openBar} grow={open} />
          <Switch>
            <Route exact path={path}>
              <Home gapi={{ g_api, signedIn }} />
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
