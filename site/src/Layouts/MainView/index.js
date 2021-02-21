import React, { useState, useEffect, useRef } from 'react';
import NavBar from 'components/DashNav';
import useGoogle from 'Hooks/useGoogle';
import SideBar from 'components/SideBar';
import Modal from 'components/Modal';
import google from 'assets/icons/google.png';
import './style.scss';

const MainView = ({ children, type }) => {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const modalRef = useRef();
  const { gapi, signIn } = useGoogle({ updateSignInStatus });

  const openBar = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

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
    <main className="dashboard flex justify-center items-start h-full w-full relative bg-v_light">
      <Modal ref={modalRef} useButton={false}>
        <section className="g_signup flex-col flex-center shadow w-screen mx-3.5 h-72 max-w-sm rounded-lg p-7 bg-white">
          <p className="text-sm text-txt mb-5">
            To better participate in this course please signin to access google
            drive materials for this course
          </p>
          <p className="text-sm text-txt">
            click on the button below to signin.
          </p>
          <button
            className="flex-center bg-light w-full px-5 py-2.5 rounded-md shadow mt-5"
            onClick={signin}
          >
            <img src={google} alt="google" className="w-6 mr-2.5 md:mr-5" />
            <p className="text-txt text-xs md:text-sm">Google</p>
          </button>
        </section>
      </Modal>
      <aside className={`dh-aside ${open ? ' open' : ''}`}>
        <SideBar close={close} type={type} />
      </aside>
      <section className="dh-main flex justify-start items-start flex-col px-5 lg:px-16 flex-grow overflow-hidden mt-20">
        <div className="content xl:container mx-auto h-full flex-grow flex-center flex-col w-screen">
          <NavBar open={openBar} grow={open} />
          {React.cloneElement(children, { gapi: { gapi, signedIn } })}
        </div>
        <div className="w-full text-center p-8">
          (c) 2020 Utiva All Rights Reserved
        </div>
      </section>
    </main>
  );
};

export default MainView;
