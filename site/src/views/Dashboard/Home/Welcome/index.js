import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../../../helpers';
import { login } from '../../../../g_actions/user';
import wel from '../../../../assets/wel.png';
import './style.scss';

const Welcome = ({ user }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(user.firstentry && user.isStudent);

  const setFirstUserFalse = async () => {
    await axiosInstance.patch('/user/update', {
      firstentry: false,
    });
    setOpen(false);
    dispatch(login());
  };

  return (
    <>
      {open ? (
        <div className="welcome">
          <nav>
            <div className="flex-row j-space">
              <p className="s_hd">Welcome {user.firstName}!</p>
              <button onClick={setFirstUserFalse}>Close</button>
            </div>
            <span className="seperator"></span>
          </nav>

          <img
            src={wel}
            alt="Welcome"
            className="wel_img img contain mx-auto flex-row"
          />

          <div className="text-sec">
            <div className="_text">
              <p>
                Thanking you for registering. This is your learning environment.{' '}
              </p>
            </div>

            <div className="_text">
              <h2>About Utiva</h2>
              <p>
                Utiva develops the best talents for global businesses! We help
                you become top 5% most sought-after talent by global brands.
              </p>
            </div>

            <div className="_text">
              <h2>Our Learning Programmes</h2>
              <p>
                Utiva runs 6 digital skill training schools and invests in
                developing an ecosystem of skilled talents across the entire
                technology lifecycle. We also help companies both in Africa and
                abroad access technology savvy talents through our remote model
                or for product dev.
              </p>
            </div>

            <div className="_text">
              <h2>Why we are the best</h2>
              <h3>World-class instructors</h3>
              <p>
                Our instructors have an average of 15 years of industry
                experience.
              </p>

              <h3>A hands-on approach</h3>
              <p>
                We move beyond just the typical training to creating
                project-based learning environment.
              </p>

              <h3>AI-Powered learning</h3>
              <p>
                Utiva as a platform is an enterprise solution that allows for
                remote interaction with facilitators and AI support for
                reinforcing knowledge and skills.
              </p>

              <h3>An Ecosystem of Talent</h3>
              <p>
                We have one of the largest communities of talents, professionals
                and thinkers.
              </p>
            </div>
            <a
              className="btn p_btn flex-row"
              href="http://utiva.io/courses"
              target={'_'}
            >
              Start Learning
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Welcome;
