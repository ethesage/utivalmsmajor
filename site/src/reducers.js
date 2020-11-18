import { combineReducers } from 'redux';
import load from './components/Loader/reducer';
import auth from './g_reducers/user';
import member from './g_reducers/member';
import courses from './g_reducers/courses';
import home from './views/Dashboard/Home/reducer';
import breadcrumb from './g_reducers/breadcrumbs';
import admin from './g_reducers/admin';
import trainers from './g_reducers/trainer';
import users from './g_reducers/users';

const reducers = combineReducers({
  load,
  auth,
  member,
  courses,
  home,
  breadcrumb,
  admin,
  trainers,
  users,
});

export default reducers;
