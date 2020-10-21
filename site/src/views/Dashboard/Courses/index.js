import React from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Overview from 'components/OverView';
import CourseList from './CoursesList';
import Classroom from 'views/Classroom';
import FullClass from 'views/FullClass';
import Assignment from 'views/Assignment';
import TrainerProtected from 'components/Protected/TrainerProtected';

import NavBar from 'components/CourseNav';
import Nav from 'components/InnerHeader';
import StudyPlan from '../../StudyPlan';
import Members from '../../Members';
import './style.scss';

const Courses = ({ gapi }) => {
  let { path } = useRouteMatch();
  const currentCourse = useSelector((state) => state.member.currentCourse);

  return (
    <section className="dash-con mx_courx flex-col al-start j-start">
      <Nav>
        <Link to="/courses" className="reg_text">
          <h3>My Courses</h3>
        </Link>
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
        <Route exact path={`${path}`} component={CourseList} />
        <Route exact path={`${path}/classroom/:courseId`}>
          <Classroom gapi={gapi} />
        </Route>
        <Route exact path={`${path}/classroom/:courseId/:classroom`}>
          <FullClass gapi={gapi} />
        </Route>
        <Route
          exact
          path={`${path}/assignment/:courseId/:classroom/:assignmentId?`}
        >
          <Assignment gapi={gapi} />
        </Route>
        <Route
          exact
          path={`${path}/add_assigment/:courseId/:classroom/:assignmentId?`}
        >
          <Assignment gapi={gapi} />
        </Route>
        <Route
          exact
          path={`${path}/study-plan/:courseId`}
          component={StudyPlan}
        />
        <Route exact path={`${path}/members/:courseId`} component={Members} />
        <TrainerProtected
          exact
          path={`${path}/editClass/:courseId`}
          component={Members}
        />
      </Switch>
    </section>
  );
};

export default Courses;
