import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-skeleton-loader';
import CourseCard from 'components/CourseCard';
import {
  getCourse,
  resetHomePageCourse,
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

  const courses =
    allCourses && categories && allCourses[categories[currentCategory].name];

  const [loading, , fetch, restart] = useFetch(dispatch, !!!courses, true);
  const [c_loading, , c_fetch] = useFetch(dispatch, !!!categories, true);

  const onClick = (id) => {
    setCurrentCategory(id);
    setTimeout(() => restart(), 0);
  };

  useEffect(() => {
    if (!categories) return;
    if (courses) return;

    if (loading) {
      fetch(() => getCourse(1, '/main', categories[currentCategory].name));
    }
  }, [
    dispatch,
    allCourses,
    fetch,
    loading,
    categories,
    currentCategory,
    courses,
  ]);

  useEffect(() => {
    if (!c_loading) return;

    c_fetch(() => getcategories());
  }, [c_fetch, c_loading]);

  useEffect(() => {
    return () => {
      dispatch(resetHomePageCourse());
    };
  }, [dispatch]);

  return (
    <section className="courses m-150">
      <h2 className="hd middle">Available Courses</h2>
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
        <div className="course-sec flex-row j-space">
          {/* {categories[currentCategory].data.map((course, i) => (
            <CourseCard data={course} key={`current_cate_${i}`} />
          ))} */}
          {loading ? (
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
            courses?.map((course, i) => (
              <CourseCard
                data={course}
                // size="small"
                size={courses.length === 1 ? 'small' : ''}
                key={`current_cate_${i}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Course;
