import React from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Overview from 'components/OverView';
import CourseList from './CoursesList';
import Classroom from 'components/Classroom';
import FullClass from 'components/Classroom/FullClass';
import Assignment from 'views/Assignment';
import ViewGrade from 'views/Assignment/ViewGrade';
import StudyPlan from 'views/StudyPlan';
import Members from 'views/Members';
import CreateCourse from 'views/CreateCourse';
import Nav from 'components/InnerHeader';
import './style.scss';

const Courses = ({ gapi }) => {
  let { path } = useRouteMatch();
  const currentCourse = useSelector((state) => state.courses.currentCourse);

  return (
    <section className="dash-con mx_courx flex-col al-start j-start">
      <Nav>
        {currentCourse ? (
          <>
            <span>{' > '}</span>
            <Link
              to={`/courses/overview/${currentCourse.courseCohortId}`}
              className="reg_text"
            >
              <h3> {`${currentCourse.Course.name}`}</h3>
            </Link>
          </>
        ) : (
          ''
        )}
      </Nav>
      <Switch>
        <Route exact path={`${path}/overview/:courseId`} component={Overview} />
        <Route exact path={`${path}/create`} component={CreateCourse} />
        <Route exact path={`${path}`} component={CourseList} />
        <Route
          exact
          path={`${path}/classroom/:courseId`}
          component={Classroom}
        />
        <Route
          exact
          path={`${path}/classroom/:courseId/:classroom`}
          component={FullClass}
        />
        <Route
          exact
          path={`${path}/assignment/view_grade/:id`}
          component={ViewGrade}
        />
        <Route exact path={`${path}/assignment/:courseId/:classroom`}>
          <Assignment gapi={gapi} />
        </Route>
        <Route
          exact
          path={`${path}/study-plan/:courseId`}
          component={StudyPlan}
        />
        <Route exact path={`${path}/members/:courseId`} component={Members} />
      </Switch>
    </section>
  );
};

export default Courses;
