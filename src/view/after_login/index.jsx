import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory, Switch } from "react-router-dom";
import { login } from "../../actions";
import { getLoginToken } from "../../local_storage";
import { getProfile } from "../../request/user";
import Loading from "../loading";
import NotApproved from "./student/not_approved";
import Announcement from "./teacher/announcement";

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
    }

    else if(loginUser.role === "teacher") {
      routes = (
        <Route path="/">
          <Announcement/>
        </Route>
      )
    }

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
