import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcourses } from 'g_actions/admin';
import useFetch from 'Hooks/useFetch';
import Button from 'components/Button';
import Create from 'views/CreateCourse';
import not_found from 'assets/not_found.png';
import Loader from 'components/Loading';
import CourseList from './CoursesList';
import CohortList from 'views/AllCourseCohorts';

import Overview from 'components/OverView';
import Classroom from 'views/Classroom';
import FullClass from 'views/FullClass';
import Assignment from 'views/Assignment';
import AllAssignments from 'views/AllAssignments';
import TrainerProtected from 'components/Protected/TrainerProtected';
import StudyPlan from '../../StudyPlan';
import Members from '../../Members';
import './style.scss';

const Courses = ({ gapi }) => {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const allCourses = useSelector((state) => state.admin.allCourses);
  const [loading, error, fetch] = useFetch(dispatch, !allCourses, true);

  useEffect(() => {
    if (!allCourses)
      (async () => {
        await fetch(() => getAllcourses());
      })();

    return () => {};
  }, [dispatch, fetch, allCourses]);

  return (
    <section className="dash-con mx_courx flex-col al-start j-start">
      {loading ? (
        <div className="img">
          <Loader tempLoad={true} full={false} />
        </div>
      ) : error ? (
        <p>An Error Occurred</p>
      ) : allCourses.length === 0 ? (
        <div className="nt_found img flex-col">
          <img src={not_found} alt="Not found" />
          <p className="text">There are no Courses yet</p>

          <Button
            link="/admin/courses/create"
            text="Create Course"
            className="flex-row"
          />
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
            <Route exact path={`${path}/create`} component={Create} />
            <Route exact path={`${path}/edit/:courseId`}>
              <Create edit />
            </Route>
            <Route
              exact
              path={`${path}/:courseId/cohorts`}
              component={CohortList}
            />

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
