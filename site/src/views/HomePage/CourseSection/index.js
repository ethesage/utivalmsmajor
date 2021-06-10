import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-skeleton-loader';
import CourseCard from 'components/CourseCard';
import {
  getCourse,
  // resetHomePageCourse,
  getcategories,
} from 'g_actions/mainCourse';
import no_course from 'assets/dashboard/no_course.png';
import useFetch from 'Hooks/useFetch';
import './style.scss';

const Loader = ({ height }) => <Skeleton width="100%" height={height} />;

const NoCourse = () => (
  <div className="next_class flex-col img" style={{ minHeight: '300px' }}>
    <img src={no_course} alt="" className="" />
    <div className="text-sec flex-col">
      <h3 style={{ marginTop: '10px' }}>No available courses</h3>
    </div>
  </div>
);

const Course = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const { allCourses, categories } = useSelector((state) => state.homepage);
  const dispatch = useDispatch();

  const courses = categories && allCourses[categories[currentCategory].name];

  const [c_loading, , c_fetch] = useFetch(dispatch, !!!categories, true);

  const onClick = (id) => {
    setCurrentCategory(id);
  };

  useEffect(() => {
    if (!categories) return;
    if (courses) return;

    dispatch(getCourse(1, '/main', categories[currentCategory].name));
  }, [dispatch, allCourses, categories, currentCategory, courses]);

  useEffect(() => {
    if (!c_loading) return;

    c_fetch(() => getcategories());
  }, [c_fetch, c_loading]);

  useEffect(() => {
    return () => {
      // dispatch(resetHomePageCourse());
    };
  }, [dispatch]);

  return (
    <section className="courses m-150">
      <div className="container">
        <h2 className="hd middle">Technology Learning Tracks</h2>
        <Link to="/all-courses">
          <strong>
            <small className="theme-color">View All {'>'}</small>
          </strong>
        </Link>
      </div>
      <div className="container">
        <div className="cat-sec flex-row j-space">
          {categories &&
            categories
              .sort((a, b) => a.name < b.name)
              .map((category, i) => (
                <div
                  className="cat"
                  key={`hmp_cat_${i}`}
                  onClick={() => onClick(i)}
                  data-active={i === currentCategory}
                >
                  {category.name}
                </div>
              ))}
        </div>
        <div className="course-sec flex-row j-start">
          {/* {categories[currentCategory].data.map((course, i) => (
            <CourseCard data={course} key={`current_cate_${i}`} />
          ))} */}
          {!courses ? (
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
          ) : courses?.length === 0 ? (
            <NoCourse />
          ) : (
            <div
              className={`crs_con flex-row j-start  ${
                courses?.length === 1 ? 'single' : ''
              }`}
            >
              {courses?.map((course, i) => (
                <CourseCard
                  data={course}
                  // size="small"
                  size={courses.length === 1 ? 'small' : ''}
                  key={`current_cate_${course.name}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Course;
