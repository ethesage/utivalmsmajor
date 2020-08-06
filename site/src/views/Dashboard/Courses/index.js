import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseList from "./CoursesList";
import CourseDetails from "./CourseDetails";
import "./style.scss";

const Courses = () => {
  const { courseId } = useParams();

  return (
    <main className="dash-con mx_courx">
      <section className="mx_courx__con">
        {courseId ? <CourseDetails /> : <CourseList />}
      </section>
    </main>
  );
};

export default Courses;
