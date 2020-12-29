import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./shared/Header";
import Sidebar from "./shared/Sidebar";
import Page from "./shared/Page";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";

import MyPayment from "./Payment";
import MyAnnouncement from "./Announcement";
import AnnouncementView from "./AnnouncementView";
import MyProgress from "./Progress";
import MyProfile from "./Profile";

import { toggleSidebar } from "../../../actions/student";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
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
  const state = useSelector(state => state.student);
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Toolbar />
      <div className={classes.mainContainer}>
        <Hidden smUp implementation="css">
          <Sidebar open={state.showSidebar} onClose={() => dispatch(toggleSidebar())} />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar open={true} variant="permanent" />
        </Hidden>
        <Container className={classes.routerWrapper}>
          <Page>
            <Switch>
              <Route path="/payment">
                <MyPayment />
              </Route>
              <Route path="/announcement/:announcementId">
                <AnnouncementView />
              </Route>
              <Route path="/announcement">
                <MyAnnouncement />
              </Route>
              <Route path="/progress">
                <MyProgress />
              </Route>
              <Route path="/profile">
                <MyProfile />
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
