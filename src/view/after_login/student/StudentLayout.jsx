import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./shared/Header";
import Sidebar from "./shared/Sidebar";
import Page from "./shared/Page";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

import MyPayment from "./Payment";
import MyAnnouncement from "./Announcement";
import MyProgress from "./Progress";

const useStyles = makeStyles((theme) => ({
  routerWrapper: {
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1,
  },
  mainContainer: {
    display: "flex",
  },
}));

const StudentLayout = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Toolbar />
      <div className={classes.mainContainer}>
        <Sidebar />
        <Container fluid className={classes.routerWrapper}>
          <Page>
            <Switch>
              <Route path="/payment">
                <MyPayment />
              </Route>
              <Route path="/announcement">
                <MyAnnouncement />
              </Route>
              <Route path="/progress">
                <MyProgress />
              </Route>
              <Route path="/">
                <Redirect to="/announcement" />
              </Route>
            </Switch>
          </Page>
        </Container>
      </div>
    </>
  );
};

export default StudentLayout;
