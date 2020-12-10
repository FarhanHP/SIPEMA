import { CssBaseline, makeStyles, Box } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./view/login";
import Page404 from "./view/page404";
import Register from "./view/register";
import React from "react";
import ForgetPassword from "./view/forget_password";
import RegisterConfirm from "./view/register_confirm";
import ResetPassword from "./view/reset_password";
import Main from "./view/after_login";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "white",
    },
  };
});

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Box className={classes.root}>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register/token/:token">
              <RegisterConfirm />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/password/reset/token/:token">
              <ResetPassword />
            </Route>

            <Route path="/password/reset">
              <ForgetPassword />
            </Route>

            <Route path="/">
              <Main />
            </Route>

            <Route path={"*"}>
              <Page404 />
            </Route>
          </Switch>
        </BrowserRouter>
      </Box>
    </React.Fragment>
  );
}

export default App;
