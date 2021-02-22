import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCheck from 'components/ProfileCheck';
import Classes from 'components/NextClassTrainer';
import CountSection from './CountSection';
import Layout from 'Layouts/HomeGrid';
import Welcome from './Welcome';
import girl from 'assets/utiva viretnship programme.png';
import UserClases from 'components/UserMainClass';
import './style.scss';

const InfoSec = ({ txt, children, useSubtitle = true }) => (
  <div className="info_fx flex-col">
    <nav className="c_card_nav flex-row j-space _text">
      <h2>{txt}</h2>
      <p>{txt && useSubtitle && `View All ${txt}`}</p>
    </nav>
    {children}
  </div>
);

const Home = ({ gapi }) => {
  const { user, isStudent } = useSelector((state) => state.auth);

  return (
    <main className="dash-con dash-home">
      <ProfileCheck user={user} />

      <Welcome user={user} />

      <Layout>
        <CountSection />
      </Layout>

      {isStudent ? (
        <UserClases />
      ) : (
        <Layout>
          <InfoSec txt="Next Classes" useSubtitle={false}>
            <Classes />
          </InfoSec>

          {/* <InfoSec txt="Files">
            <Files />
          </InfoSec>

          <InfoSec txt=""></InfoSec> */}
        </Layout>
      )}

      {isStudent ? (
        <>
          <div className="adv flex-row j-space">
            <div className="text_sec _text flex-col j-space al-start">
              <div className="info">
                <h2 className="theme-color">Utiva Virtenship Programme</h2>
                <p>
                  A platform that helps students gain on-the-job experience by
                  engaging with real-life projects and business cases developed
                  by leading technology companies.
                </p>
              </div>
              <a className="theme-color" href="https://utiva.io" target="_">
                Learn More
              </a>
            </div>
            <div className="img_sec">
              <img
                src={girl}
                alt="utiva Vertenship Programme"
                className="img contain"
              />
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
};

export default Home;
