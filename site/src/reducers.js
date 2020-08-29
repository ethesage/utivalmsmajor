import { combineReducers } from 'redux';
import load from './components/Loader/reducer';
import auth from './g_reducers/user';
import student from './g_reducers/student';
import courses from './g_reducers/courses';
// import home from ''

const reducers = combineReducers({
  load,
  auth,
  student,
  courses,
});

export default reducers;
