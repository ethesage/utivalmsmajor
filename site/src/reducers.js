import { combineReducers } from "redux";
import load from "./components/Loader/reducer";
import auth from "./g_reducers/user";

const reducers = combineReducers({
  load,
  auth,
});

export default reducers;
