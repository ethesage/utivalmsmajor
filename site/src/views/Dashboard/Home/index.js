import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sekeleton from 'react-skeleton-loader';
import ProfileCheck from 'components/ProfileCheck';
import Classes from 'components/NextClassTrainer';
import Files from 'components/Files';
import CountSection from './CountSection';
import Layout from 'Layouts/HomeGrid';
import Welcome from './Welcome';
import CourseCard from 'components/CourseCard';
import categories from 'data/categories';
import girl from 'assets/utiva viretnship programme.png';
import UserClases from 'components/UserMainClass';
import { getCourse } from './action';
import { mapCourse } from './action';
import no_course from '../../../assets/dashboard/no_course.png';
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

const Loader = () => (
  <div className="next_class">
    <Sekeleton width="120%" height="100%" />
  </div>
);

const NoCourse = () => (
  <div className="next_class flex-row ">
    <img src={no_course} alt="" className="" />
    <div className="text-sec flex-col">
      <h2>No available course</h2>
    </div>
  </div>
);

const Home = ({ gapi }) => {
  const { user, isStudent } = useSelector((state) => state.auth);
  const { allCourses, mappedCourses } = useSelector((state) => state.home);
  // const {  } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allCourses) return;

    (async () => {
      await dispatch(getCourse(1, '/view'));
    })();
  }, [dispatch, allCourses]);

  // let mapCourse;

  useEffect(() => {
    if (mappedCourses) return;

    if (allCourses) {
      (async () => {
        await dispatch(
          mapCourse(
            allCourses.rows.reduce((acc, course, index) => {
              const all = {
                img: course.thumbnail,
                cost: course.cost,
                duration: course.duration,
                // name: course.name,
                link: course.learnMore,
                title: course.name,
                desc: course.description,
                value: course.value || 'Certificate',
                level: course.level || 'For expirenced professional',
                courseCohortId: course.CourseCohorts[0]?.id || null,
                studentCourse: course.StudentCourses,
              };
              acc[index] = { ...all };
              return acc;
            }, [])
          )
        );
      })();
    }
  }, [dispatch, allCourses]);

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

          <InfoSec txt="Files">
            <Files />
          </InfoSec>

          <InfoSec txt=""></InfoSec>
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

          <div className="course-section">
            <nav className="cs_nav flex-row j-space reg_text">
              <h2>Top Skills People are Learning</h2>
              <p>View all courses</p>
            </nav>
            {/* {console.log('123', mappedCourses)} */}
            {!mappedCourses ? (
              [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
            ) : mappedCourses.length === 0 ? (
              <NoCourse />
            ) : (
              mappedCourses?.map((course, i) => (
                <CourseCard
                  data={course}
                  size="small"
                  key={`current_cate_${i}`}
                />
              ))
            )}
          </div>
        </>
      ) : null}
    </main>
  );
};

export default Home;
