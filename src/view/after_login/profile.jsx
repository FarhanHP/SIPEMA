import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  makeStyles,
  Button,
  Tabs,
  Tab,
  Snackbar,
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../component/main";
import { Link, Route, Switch } from "react-router-dom";
import moment from "moment";
import MainProfile from "./main_profile";
import ChangePassword from "../change_password";
import { changePp } from "../../request/user";
import { getLoginToken } from "../../local_storage";
import { login } from "../../actions";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(theme => {
  return {
    pp: {
      height: theme.spacing(15),
      width: theme.spacing(15),
      fontSize: "80px",
    },

    inputContainer: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },

    input: {
      display: "none",
    },

    photoSizeDesc: {
      backgroundColor: blueGrey[100],
    },

    editProfileHeader: {
      backgroundColor: blueGrey[100],
    },
  };
});

export default function Profile() {
  const classes = useStyles();

  const loginUser = useSelector(state => {
    return state.loginUser;
  });

  const dispatch = useDispatch();

  const [ppLoading, setPpLoading] = useState(false);

  const [sbMsg, setSbMsg] = useState(null);

  const fullname = loginUser.fullname;

  const role = loginUser.role;

  const pp = loginUser.pp;

  const created = loginUser.created;

  const [location, setLocation] = useState(window.location.pathname);

  const handleChangePic = event => {
    const file = event.target.files[0];

    const mbFileSize = (file.size / 1024 / 1024).toFixed(4);

    if (mbFileSize >= 10) {
      setSbMsg("Ukuran foto tidak boleh melebihi 10 MB.");
    } else {
      setPpLoading(true);

      changePp(getLoginToken(), file).then(res => {
        if (res.ok) {
          res.json().then(data => {
            loginUser.pp = data.pp;

            dispatch(login(loginUser));

            setPpLoading(false);

            setSbMsg("Berhasil mengganti foto profil.");
          });
        } else {
          setPpLoading(false);

          setSbMsg("Gagal mengganti foto profil.");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Profil SIPEMA</title>
      </Helmet>

      <Main loginUser={loginUser}>
        <Grid container direction="row-reverse" spacing={2}>
          <Grid item xs={12} lg={4}>
            <Box component={Paper} p="20px">
              <Typography variant="h4" gutterBottom align="center">
                {fullname}
              </Typography>

              <Typography gutterBottom align="center">
                {role === "teacher" ? "Guru" : "Murid"}
              </Typography>

              <Box display="flex" width="100%" my="20px">
                <Box mx="auto">
                  {ppLoading ? (
                    <Skeleton height="120px" width="120px" variant="circle"></Skeleton>
                  ) : (
                    <Avatar src={pp} className={classes.pp}>
                      {fullname.charAt(0)}
                    </Avatar>
                  )}
                </Box>
              </Box>

              <Box display="flex" width="100%" mb="20px">
                <Box mx="auto" className={classes.inputContainer}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    type="file"
                    id="contained-button-file"
                    onChange={handleChangePic}
                  />

                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                      GANTI FOTO PROFIL
                    </Button>
                  </label>
                </Box>
              </Box>

              <Box p="10px" className={classes.photoSizeDesc} mb="20px">
                <Typography align="center">
                  Ukuran foto maksimum: <b>10 MB</b>
                </Typography>
              </Box>

              <Box mb="20px">
                <Typography>
                  Bergabung pada: <b>{moment.unix(created).format("llll")}</b>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Box component={Paper}>
              <Box px="20px" className={classes.editProfileHeader}>
                <Box py="40px">
                  <Typography variant="h4">Edit Profil</Typography>
                </Box>

                <Tabs
                  indicatorColor="primary"
                  value={location}
                  onChange={(event, newValue) => {
                    setLocation(newValue);
                  }}
                >
                  <Tab label="Umum" component={Link} to="/profile" value="/profile" />

                  <Tab
                    label="Ganti Password"
                    component={Link}
                    to="/profile/password"
                    value="/profile/password"
                  />
                </Tabs>
              </Box>

              <Box p="20px">
                <Switch>
                  <Route path="/profile/password">
                    <ChangePassword />
                  </Route>

                  <Route path="/profile">
                    <MainProfile />
                  </Route>
                </Switch>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Main>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        message={sbMsg}
        open={sbMsg}
        key={sbMsg}
        autoHideDuration={6000}
        onClose={() => {
          setSbMsg(null);
        }}
      />
    </React.Fragment>
  );
}
