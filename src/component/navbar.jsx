import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Hidden,
  Box,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { logout } from "../request/user";
import { deleteLoginToken, getLoginToken } from "../local_storage";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "white",
    },
  };
});

export default function Navbar(props) {
  const classes = useStyles();

  const loginUser = props.loginUser;

  const [anchorEl, setAnchorEl] = useState(null);

  const [loggingOut, setLoggingOut] = useState(false);

  const [sbMsg, setSbMsg] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuButtonClick = props.onMenuButtonClick;

  return (
    <React.Fragment>
      <AppBar className={classes.root} elevation={1}>
        <Toolbar>
          <Box width={"50%"} display="flex">
            <Hidden mdUp>
              <IconButton size="small" onClick={onMenuButtonClick}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>

          <Box width={"50%"} display="flex" flexDirection="row-reverse">
            <div>
              <IconButton onClick={handleClick} size={"small"}>
                <Avatar src={loginUser.pp}>
                  {loginUser.fullname.charAt(0)}
                </Avatar>
              </IconButton>

              <Menu open={anchorEl} onClose={handleClose} anchorEl={anchorEl}>
                <MenuItem component={Link} to="/profile">
                  Profil
                </MenuItem>

                <MenuItem
                  component={Button}
                  onClick={() => {
                    setLoggingOut(true);

                    logout(getLoginToken()).then((res) => {
                      if (res.ok) {
                        deleteLoginToken();

                        window.location.href = "/";
                      } else {
                        setSbMsg("Gagal Log Out.");

                        setLoggingOut(false);
                      }
                    });
                  }}
                  disabled={loggingOut}
                >
                  {loggingOut ? "Logging Out..." : "Log Out"}
                </MenuItem>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={sbMsg}
        onClose={() => {
          setSbMsg(null);
        }}
        message={sbMsg}
        autoHideDuration={6000}
      />
    </React.Fragment>
  );
}
