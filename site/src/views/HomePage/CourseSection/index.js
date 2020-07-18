import React, { useState } from "react";
import CourseCard from "../../../components/CourseCard";
import categories from "../../../data/categories";
import "./style.scss";

const Course = () => {
  const [currentCategory, setCurrentCategory] = useState(0);

  const onClick = (id) => {
    setCurrentCategory(id);
  };

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
          {categories[currentCategory].data.map((course, i) => (
            <CourseCard data={course} key={`current_cate_${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Course;
