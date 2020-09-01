import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Classes from '../../../components/Classes';
import Files from '../../../components/Files';
import CountSection from './CountSection';
import Welcome from './Welcome';
import CourseCard from '../../../components/CourseCard';
import categories from '../../../data/categories';
import girl from '../../../assets/utiva viretnship programme.png';
import UserClases from '../../../components/UserMainClass';
import './style.scss';

const InfoSec = ({ txt, children }) => (
  <div className="c_card large flex-col">
    <nav className="c_card_nav flex-row j-space _text">
      <h2>{txt}</h2>
      <p>{txt && `View All ${txt}`}</p>
    </nav>
    {children}
  </div>
);

const Home = ({ gapi }) => {
  const { user, isStudent } = useSelector((state) => state.auth);

  return (
    <main className="dash-con dash-home">
      {!user.profilePic || user.profilePic === '' ? (
        <div className="com-profile flex-row j-space">
          <p>Your profile is incomplete. Please update your profile</p>

          <Button
            className="p_btn short flex-row"
            link="/dashboard/settings"
            text="Update Profile"
          />
        </div>
      ) : null}

      <Welcome user={user} />

      <div className="p_sec flex-row j-space">
        <CountSection />
      </div>

      {isStudent ? (
        <UserClases />
      ) : (
        <div className="p_sec flex-row j-space">
          <InfoSec txt="Classes">
            <Classes />
          </InfoSec>

          <InfoSec txt="Files">
            <Files />
          </InfoSec>

          <InfoSec txt="">{/* <Activities /> */}</InfoSec>
        </div>
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

          <div className="course-section">
            <nav className="cs_nav flex-row j-space reg_text">
              <h2>Top Skills People are Learning</h2>
              <p>View all courses</p>
            </nav>

            <div className="flex-col al-start">
              {categories[0].data.map((course, i) => (
                <CourseCard
                  data={course}
                  size="small"
                  key={`current_cate_${i}`}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
};

export default Home;
