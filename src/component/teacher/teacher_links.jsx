import React from "react";
import { List, ListItemText, ListItem, ListItemIcon, makeStyles } from "@material-ui/core";
import {
  AnnouncementOutlined as AnnouncementIcon,
  PeopleOutlined as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  History as HistoryIcon,
} from "@material-ui/icons";
import { blueGrey } from "@material-ui/core/colors";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(() => {
  return {
    listBtn: {
      color: "black",
      fontWeight: "bold",
    },

    listItemIcon: {
      color: "black",
    },

    activeLink: {
      backgroundColor: blueGrey[100],
      borderRadius: "0 20px 20px 0",
    },
  };
});

export default function TeacherLinks() {
  const classes = useStyles();

  return (
    <List>
      <ListItem
        button
        className={classes.listBtn}
        component={NavLink}
        exact
        to="/"
        activeClassName={classes.activeLink}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <AnnouncementIcon />
        </ListItemIcon>

        <ListItemText primary="Pengumuman" />
      </ListItem>

      <ListItem
        button
        className={classes.listBtn}
        component={NavLink}
        to="/students"
        activeClassName={classes.activeLink}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <PeopleIcon />
        </ListItemIcon>

        <ListItemText primary="Manajemen Murid" />
      </ListItem>

      <ListItem
        button
        className={classes.listBtn}
        component={NavLink}
        to="/payment"
        activeClassName={classes.activeLink}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <AttachMoneyIcon />
        </ListItemIcon>

        <ListItemText primary="Riwayat Pembayaran Murid" />
      </ListItem>

      <ListItem
        button
        className={classes.listBtn}
        component={NavLink}
        to="/log"
        activeClassName={classes.activeLink}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <HistoryIcon />
        </ListItemIcon>

        <ListItemText primary="Log Aktivitas Pengguna" />
      </ListItem>
    </List>
  );
}
