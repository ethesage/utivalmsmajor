import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from 'g_actions/member';
import useFetch from 'Hooks/useFetch';
import Button from 'components/Button';
import Overview from 'components/OverView';
import not_found from 'assets/not_found.png';
import Loader from 'components/Loading';
import CourseList from './CoursesList';
import Classroom from 'views/Classroom';
import FullClass from 'views/FullClass';
import Assignment from 'views/Assignment';
import AllAssignments from 'views/AllAssignments';
import TrainerProtected from 'components/Protected/TrainerProtected';
import BreadCrumb from 'components/BreadCrumbs';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import StudyPlan from '../../StudyPlan';
import Members from '../../Members';
import './style.scss';

const Courses = ({ gapi }) => {
  let { path } = useRouteMatch();
  useBreadcrumbs({ name: 'My Courses', link: '/courses', start: true });
  const dispatch = useDispatch();
  const { isStudent } = useSelector((state) => state.auth);
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const userType = isStudent ? 'student' : 'trainer';
  const [loading, error, fetch] = useFetch(dispatch, !enrolledcourses, true);

  useEffect(() => {
    if (!enrolledcourses)
      (async () => {
        await fetch(() => getEnrolledCourses(null, null, userType));
      })();

    return () => {};
  }, [dispatch, fetch, userType, enrolledcourses]);

  return (
    <section className="dash-con mx_courx flex-col al-start j-start">
      <BreadCrumb />
      {loading ? (
        <div className="img">
          <Loader tempLoad={true} full={false} />
        </div>
      ) : error ? (
        <p>An Error Occurred</p>
      ) : enrolledcourses.length === 0 ? (
        <div className="nt_found img flex-col">
          <img src={not_found} alt="Not found" />
          {isStudent ? (
            <p className="text">You are yet to enrol for any course</p>
          ) : (
            <p className="text">You have not been assigned any Courses</p>
          )}
          {isStudent && (
            <Button
              link="utiva.io"
              text="Start Learning"
              className="flex-row"
            />
          )}
        </div>
      ) : (
        <>
          <Switch>
            <Route
              exact
              path={`${path}/overview/:courseId`}
              component={Overview}
            />
            <Route exact path={`${path}`} component={CourseList} />
            <Route exact path={`${path}/classroom/:courseId`}>
              <Classroom gapi={gapi} />
            </Route>
            <Route exact path={`${path}/classroom/:courseId/:classroom`}>
              <FullClass gapi={gapi} />
            </Route>

            <TrainerProtected
              exact
              path={`${path}/classroom/:courseId/:classroom/add-assignment`}
            >
              <FullClass gapi={gapi} />
            </TrainerProtected>

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
              path={`${path}/all-assignments/:courseId/:classroom?`}
            >
              <AllAssignments gapi={gapi} />
            </TrainerProtected>
          </Switch>
        </>
      )}
    </section>
  );
};

export default Courses;
