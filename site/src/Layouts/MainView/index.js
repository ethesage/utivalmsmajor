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
    <main className="dashboard flex justify-start items-start h-full w-full relative bg-v_light">
      <aside className={`dh-aside ${open ? ' open' : ''}`}>
        <SideBar close={close} type={type} />
      </aside>
      <section className="dh-main flex justify-start items-start flex-col px-5 lg:px-16 flex-grow">
        <div className="content xl:container mx-auto h-full flex-grow flex-col w-screen">
          <NavBar open={openBar} grow={open} />
          <div className="content-sec w-full">{children}</div>
        </div>
        <div className="w-full text-center p-8">
          (c) 2020 Utiva All Rights Reserved
        </div>
      </section>
    </main>
  );
};

export default MainView;
