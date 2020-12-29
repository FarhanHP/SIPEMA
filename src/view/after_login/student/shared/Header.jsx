import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../../actions/student";

const useStyles = makeStyles(theme => {
  return {
    appbar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.secondary,
      zIndex: theme.zIndex.drawer + 1,
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});

const ProfilePicture = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const mutation = useMutation(
    formData => {
      return fetch("https://sipema.herokuapp.com/b/user/logout", {
        method: "DELETE",
        headers: {
          token: window.localStorage.getItem("login_token"),
        },
        body: JSON.stringify(formData),
      });
    },
    {
      onSuccess: res => {
        window.localStorage.removeItem("login_token");
        history.push("/login");
      },
    },
  );

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    mutation.mutate();
  };

  const user = useSelector(state => state.loginUser);
  return (
    <>
      <Menu
        id="user-actions"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>{mutation.isLoading ? "Logout...." : "Logout"}</MenuItem>
      </Menu>
      <Avatar
        src={user.pp}
        aria-controls="user-actions"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <AppBar className={classes.appbar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          SIPEMA
        </Typography>
        <ProfilePicture />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
