import React, { useState, useEffect } from 'react';
import NavBar from 'components/DashNav';
import SideBar from 'components/SideBar';
import './style.scss';

const MainView = ({ children, type }) => {
  const [open, setOpen] = useState(false);

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
        <SideBar close={close} type={type} />
      </aside>
      <section className="dh-main flex-col">
        <div className="contents flex-col">
          <NavBar open={openBar} grow={open} />
          {children}
        </div>
        <div className="dash-footer">
          (c) {new Date().getFullYear()} Utiva All Rights Reserved
        </div>
      </section>
    </main>
  );
};

export default MainView;
