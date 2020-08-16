import { combineReducers } from "redux";
import load from "./components/Loader/reducer";
import auth from "./g_reducers/user";
// import home from ''

const reducers = combineReducers({
  load,
  auth,
});

export default reducers;
