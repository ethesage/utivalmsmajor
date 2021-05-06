import React, { useState, useEffect, useRef } from 'react';
import NavBar from 'components/DashNav';
import SideBar from 'components/SideBar';
import Modal from 'components/Modal';
import google from 'assets/icons/google.png';
import './style.scss';

const MainView = ({ children, type }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

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
      <Modal ref={modalRef} useButton={false}>
        <section className="g_signup flex-col box-shade">
          <p className="intro">
            To better participate in this course please signin to access google
            drive materials for this course
          </p>
          <p className="ext">click on the button below to signin.</p>
          <button className="flex-row">
            <img src={google} alt="google" />
            <p>Google</p>
          </button>
        </section>
      </Modal>
      <aside className={`dh-aside ${open ? ' open' : ''}`}>
        <SideBar close={close} type={type} />
      </aside>
      <section className="dh-main flex-col">
        <div className="contents flex-col">
          <NavBar open={openBar} grow={open} />
          {children}
        </div>
        <div className="dash-footer">(c) {new Date().getFullYear()} Utiva All Rights Reserved</div>
      </section>
    </main>
  );
};

export default MainView;
