import React from "react";
import CourseCard from "../ActiveCourseCard";
import Facilitators from "../Facilitators";
import "./style.scss";

const Overview = () => {
  return (
    <section className="cx_ovx">
      <div className="ac_crd">
        <CourseCard />
        <Facilitators />
      </div>

      <div className="info_sec reg_text">
        <div className="info">
          <h2>Data Accelerator</h2>
          <p>
            Join and collaborate with other students in our Instructor-led
            virtual classes for an optimized learning experience. Work on
            real-life design-related projects by applying what you learn to
            solve related business problems. Understand how to develop an
            effective Analytics strategy within the overall framework of the
            business.
          </p>
        </div>

        <div className="list_info">
          <h2>What you will learn</h2>
          <div className="list">
            <span className="flex-row">
              <p>1</p>
            </span>
            <h3>How to Query Data</h3>
            <p>
              The SQL class helps you learn how to use Structured Query Language
              (SQL) to extract and analyze data stored in databases. You’ll
              first learn to extractdata, join tables together, and perform
              aggregations. Then you’ll learn to do more complex analysis and
              manipulations using subqueries, temp tables, and window functions.
              By the end of the course, you’ll be able to write efficient SQL
              queries to successfullyhandle a variety of data analysis task
            </p>
          </div>
          <div className="list">
            <span className="flex-row">
              <p>2</p>
            </span>
            <h3>How to Visualize Data</h3>
            <p>
              Our Microsoft Business Intelligence or Power BI for Data Analytics
              class has been designed to provide you with the capability to
              analyze big data and share insights across different functional
              groups. Through a series of highly experiential and engaging
              classroom sessions, you'd learn to monitor business data and get
              answers quickly with rich dashboards that can be shared on every
              device.
            </p>
          </div>
          <div className="list">
            <span className="flex-row">
              <p>3</p>
            </span>
            <h3>How to develop Data Strategy</h3>
            <p>
              torrents of data that are critical to your company’s success and
              develop sustainable competitive advantage given the volume, depth
              and accessibility of digital data. Lastly, you learn how to drive
              innovation and establish a data culture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
