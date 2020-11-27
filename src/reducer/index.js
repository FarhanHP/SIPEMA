import { combineReducers } from "redux";
import loginUserReducer from "./login_user";

const allReducer = combineReducers({
  loginUser: loginUserReducer,
});

export default allReducer;
