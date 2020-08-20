import React from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  // useParams,
  Link,
} from 'react-router-dom';
import Overview from '../../../components/OverView';
import CourseList from './CoursesList';
import Classroom from '../../../components/Classroom';
import FullClass from '../../../components/Classroom/FullClass';
import Assignment from '../../../components/Assignment';
import ViewGrade from '../../../components/Assignment/ViewGrade';
import StudyPlan from '../../StudyPlan';
import Members from '../../Members';
import './style.scss';

const Courses = () => {
  let { path } = useRouteMatch();

  return (
    <section className="dash-con mx_courx">
      <nav className="nav_cux flex-row j-start">
        <Link to="/dashboard/courses" className="reg_text">
          <h3>My Courses</h3>
        </Link>
        <span>
          <strong>{'>'}</strong>
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
        <Route
          exact
          path={`${path}/assignment/view_grade/:id`}
          component={ViewGrade}
        />
        <Route
          exact
          path={`${path}/assignment/:courseId/:index`}
          component={Assignment}
        />
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
