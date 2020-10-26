import { combineReducers } from 'redux';
import load from './components/Loader/reducer';
import auth from './g_reducers/user';
import member from './g_reducers/member';
import courses from './g_reducers/courses';
import home from './views/Dashboard/Home/reducer';
import breadcrumb from './g_reducers/breadcrumbs';

const reducers = combineReducers({
  load,
  auth,
  member,
  courses,
  home,
  breadcrumb,
});

export default reducers;
