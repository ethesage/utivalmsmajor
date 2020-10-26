import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  matchPath,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from 'g_actions/member';
import useFetch from 'Hooks/useFetch';
import Overview from 'components/OverView';
import Loader from 'components/Loading';
import Classroom from 'views/Classroom';
import FullClass from 'views/FullClass';
import Assignment from 'views/Assignment';
import TrainerProtected from 'components/Protected/TrainerProtected';
import StudyPlan from '../../StudyPlan';
import Members from '../../Members';
import './style.scss';

const Courses = ({ gapi }) => {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isStudent } = useSelector((state) => state.auth);
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const { currentCourse } = useSelector((state) => state.member);
  const userType = isStudent ? 'student' : 'trainer';
  const [loading, error, fetch] = useFetch(dispatch, !currentCourse);
  let courseId;

  const match = matchPath(pathname, {
    path,
    exact: true,
    strict: true,
  });

  useEffect(() => {
    if (currentCourse) return;
    const course = enrolledcourses.find(
      (course) => course.courseCohortId === courseId
    );

    (async () => {
      await fetch(() => getEnrolledCourses(courseId, course, userType));
    })();

    return () => {};
  }, [enrolledcourses, courseId, dispatch, userType]);

  return (
    <section className="dash-con mx_courx flex-col al-start j-start">
      {loading ? (
        <Loader tempLoad={true} full={false} />
      ) : error ? (
        <p>An Error Occurred</p>
      ) : enrolledcourses.length === 0 ? (
        <div className="nt_found img flex-col">
          <img src={not_found} alt="Not found" />
          <p>Course Not Found</p>
        </div>
      ) : (
        <>
          <Switch>
            <Route
              exact
              path={`${path}/overview/:courseId`}
              component={Overview}
            />
            <Route exact path={`${path}/classroom/:courseId`}>
              <Classroom gapi={gapi} />
            </Route>
            <Route exact path={`${path}/classroom/:courseId/:classroom`}>
              <FullClass gapi={gapi} />
            </Route>

            <Route
              exact
              path={`${path}/classroom/:courseId/:classroom/add-assignment`}
            >
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
              path={`${path}/study-plan/:courseId`}
              component={StudyPlan}
            />
            <Route
              exact
              path={`${path}/members/:courseId`}
              component={Members}
            />
            <TrainerProtected
              exact
              path={`${path}/editClass/:courseId`}
              component={Members}
            />
          </Switch>
        </>
      )}
    </section>
  );
};

export default Courses;
