import { combineReducers } from "redux";
import loginUserReducer from "./login_user";
import studentReducer from "./student";

const allReducer = combineReducers({
  loginUser: loginUserReducer,
  student: studentReducer,
});

export default allReducer;
