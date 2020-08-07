import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
  Link,
} from "react-router-dom";
import Overview from "../../../components/OverView";
import CourseList from "./CoursesList";
import Classroom from "../../../components/Classroom";
import FullClass from "../../../components/Classroom/FullClass";
import "./style.scss";

const Courses = () => {
  let { path, url } = useRouteMatch();
  const { courseId } = useParams();

  return (
    <section className="dash-con mx_courx">
      <nav className="nav_cux flex-row j-start">
        <Link to="/dashboard/courses" className="reg_text">
          <h3>My Courses</h3>
        </Link>
        <span>
          <strong>{">"}</strong>
        </span>
        <Link to="/dashboard/courses" className="reg_text">
          <h3>Data Accelerator</h3>
        </Link>
      </nav>
      <Switch>
        <Route exact path={`${path}/overview/:courseId`} component={Overview} />
        <Route exact path={`${path}`} component={CourseList} />
        <Route
          exact
          path={`${path}/classroom/:courseId`}
          component={Classroom}
        />
        <Route
          exact
          path={`${path}/classroom/full/:courseId/:index`}
          component={FullClass}
        />

        
      </Switch>
    </section>
  );
};

export default Courses;
