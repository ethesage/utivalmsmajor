import React, { useState, useEffect } from 'react';
import Skeleton from 'react-skeleton-loader';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import Footer from 'components/Footer';
import CourseCard from 'components/CourseCard';
import { getCourse, getcategories } from 'g_actions/mainCourse';
import './style.scss';
import useFetch from 'Hooks/useFetch';
import Load from 'components/Loading';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import no_course from 'assets/dashboard/no_course.png';

const Loader = ({ height }) => <Skeleton width="100%" height={height} />;

const NoCourse = () => (
  <div className="next_class flex-col img" style={{ minHeight: '300px' }}>
    <img src={no_course} alt="" className="" />
    <div className="text-sec flex-col">
      <h3 style={{ marginTop: '10px' }}>No available courses</h3>
    </div>
  </div>
);

const AllCourses = () => {
  const { allCourses, categories } = useSelector((state) => state.homepage);
  const dispatch = useDispatch();
  const [loading, , fetch] = useFetch(dispatch, !!!categories, true);
  const [fetching, setFecting] = useState(
    Object.keys(allCourses).length === categories?.length
  );

  useEffect(() => {
    if (!loading) return;

    fetch(() => getcategories());
  }, [fetch, loading]);

  useEffect(() => {
    if (!categories && loading) return;
    if (fetching) return;

    categories.forEach(async (category) => {
      if (allCourses[category]) return;

      await dispatch(getCourse(1, '/main', category.name));
    });

    setFecting(true);
  }, [allCourses, categories, dispatch, loading, fetching]);

  return (
    <section className="all-courses">
      <Helmet>
        <title>Utiva | All courses</title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <div className="banner_sec container flex-row">
        <div className="text_sec">
          <h1>Get Trained. Get Hired</h1>
          <p>
            Utiva offers a wide variety of programs and courses and led by
            leading industry experts.
          </p>
          <p>Check out our courses</p>
        </div>
        <div className="img_sec">
          <img
            src="https://utiva.io/./assets/svg/illustrations/we-are-in-office-1.svg"
            alt="utiva.io"
            className="img contain"
          />
        </div>
      </div>

      {loading && <Load tempLoad={true} full={false} />}

      {!loading && (
        <div className="course_con container">
          {categories.map((category, i) => {
            return (
              <div key={`flc_co_${i}`}>
                <h3>{category.name}</h3>
                <div className="course-sec flex-col j-start al-start">
                  {!allCourses[category.name] ? (
                    <div className="course_ld">
                      {[1, 2, 3].map((d) => (
                        <div
                          className="next_cl flex-col al-start"
                          key={`ldx_prnt_${d}`}
                        >
                          {['10px', '200px', '20px'].map((height) => (
                            <Loader key={`load_${height}`} height={height} />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : allCourses[category.name]?.length === 0 ? (
                    <NoCourse />
                  ) : (
                    <div
                      className={`crs_con flex-row j-start  ${
                        allCourses[category.name]?.length === 1 ? 'single' : ''
                      }`}
                    >
                      {allCourses[category.name]?.map((course, i) => (
                        <CourseCard
                          data={course}
                          // size="small"
                          size={
                            allCourses[category.name].length === 1
                              ? 'small'
                              : ''
                          }
                          key={`current_cate_${i}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Footer />
    </section>
  );
};

export default AllCourses;
