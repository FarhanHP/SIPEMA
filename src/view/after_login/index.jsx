import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import { login } from "../../actions";
import { getLoginToken } from "../../local_storage";
import { getProfile } from "../../request/user";
import Loading from "../loading";
import NotApproved from "./student/not_approved";
import ActivityLog from "./teacher/activity_log";
import Announcement from "./teacher/announcement";
import StudentManagement from "./teacher/student_management";
import StudentPayment from "./teacher/student_payment";

import StudentDashboard from "./student/StudentLayout";

import Profile from "./profile";

export default function Main() {
  const history = useHistory();

  const dispatch = useDispatch();

  const loginUser = useSelector((state) => {
    return state.loginUser;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loginUser === null) {
      const token = getLoginToken();

      if (token === null) {
        history.push("/login");
      } else {
        setLoading(true);

        getProfile(token).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              dispatch(login(data));

              setLoading(false);
            });
          } else {
            history.push("/login");
          }
        });
      }
    }
  }, [loginUser, dispatch, history]);

  if (loading) {
    return <Loading />;
  } else {
    let routes = null;

    if (loginUser.role === "student") {
      if (!loginUser.approved) {
        routes = (
          <Route path="/">
            <NotApproved />
          </Route>
        );
      }
      routes = [
        <Route path="/">
          <StudentDashboard />
        </Route>,
      ];
    } else if (loginUser.role === "teacher") {
      routes = [
        <Route path="/students">
          <StudentManagement />
        </Route>,
        <Route path="/payment">
          <StudentPayment />
        </Route>,
        <Route path="/log">
          <ActivityLog />
        </Route>,
        <Route path="/profile">
          <Profile />
        </Route>,
        <Route path="/">
          <Announcement />
        </Route>,
      ];
    }
    // console.log(routes);
    return (
      <React.Fragment>
        <Helmet>
          <title>SIPEMA</title>
        </Helmet>

        <Switch>{routes}</Switch>
      </React.Fragment>
    );
  }
}
