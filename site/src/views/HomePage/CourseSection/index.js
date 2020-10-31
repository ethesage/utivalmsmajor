import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sekeleton from "react-skeleton-loader";
import CourseCard from "../../../components/CourseCard";
import categories from "../../../data/categories";
import { getCourse, mapCourse } from "../../Dashboard/Home/action";
import no_course from "assets/dashboard/no_course.png";
import "./style.scss";

const Loader = () => (
  <div className="">
    {/* {console.log('88876')} */}
    <Sekeleton width="100%" height="100%" />
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

const Course = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const { allCourses, mappedCourses } = useSelector((state) => state.home);

  const dispatch = useDispatch();

  const onClick = (id) => {
    setCurrentCategory(id);
  };

  useEffect(() => {
    if (allCourses) return;

    (async () => {
      await dispatch(getCourse(1, '/main'));
    })();
  }, [dispatch, allCourses]);

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
                value: course.value || "Certificate",
                level: course.level || "For expirenced professional",
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
    <section className="courses m-150">
      <h2 className="hd middle">Available Courses</h2>
      <div className="container">
        <div className="cat-sec flex-row j-space">
          {categories.map((category, i) => (
            <div
              className="cat"
              key={`hmp_cat_${i}`}
              onClick={() => onClick(i)}
              data-active={i === currentCategory}
            >
              {category.title}
            </div>
          ))}
        </div>
        <div className="course-sec flex-row j-space">
          {/* {categories[currentCategory].data.map((course, i) => (
            <CourseCard data={course} key={`current_cate_${i}`} />
          ))} */}
          {console.log(mappedCourses, 'op')}
          {!mappedCourses ? (
            [1, 2, 3].map((i) => <Loader key={`loaduio_${i}`} />)
          ) : mappedCourses.length === 0 ? (
            <NoCourse />
          ) : (
            mappedCourses?.map((course, i) => (
              <CourseCard
                data={course}
                // size="small"
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
