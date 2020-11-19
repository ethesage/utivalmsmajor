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
import Overview from 'components/OverView/Admin';
import Classroom from 'views/Classroom/Admin';
import FullClass from 'views/FullClass/Admin';
import AllAssignments from 'views/AllAssignments/Admin';
import StudyPlan from '../../StudyPlan/Admin';
import Members from '../../Members/Admin';
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
              path={`${path}/overview/:courseId/:cohortId`}
              component={Overview}
            />
            <Route
              exact
              path={`${path}/overview/:courseId/:cohortId/edit`}
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
            <Route exact path={`${path}/classroom/:courseId/:cohortId`}>
              <Classroom gapi={gapi} />
            </Route>
            <Route exact path={`${path}/classroom/:courseId/:cohortId/add`}>
              <Classroom gapi={gapi} />
            </Route>
            <Route
              exact
              path={`${path}/classroom/:courseId/:cohortId/:classroom`}
            >
              <FullClass gapi={gapi} />
            </Route>
            <Route
              exact
              path={`${path}/classroom/:courseId/:cohortId/:classroom/edit`}
            >
              <FullClass gapi={gapi} />
            </Route>
            <Route
              exact
              path={`${path}/classroom/:courseId/:cohortId/:classroom/add-assignment`}
            >
              <FullClass gapi={gapi} />
            </Route>

            <Route
              exact
              path={`${path}/study-plan/:courseId/:cohortId`}
              component={StudyPlan}
            />
            <Route
              exact
              path={`${path}/students/:courseId/:cohortId`}
              component={Members}
            />
            <Route
              exact
              path={`${path}/all-assignments/:courseId/:cohortId/:classroom?`}
            >
              <AllAssignments gapi={gapi} />
            </Route>
          </Switch>
        </>
      )}
    </section>
  );
};

export default Courses;
