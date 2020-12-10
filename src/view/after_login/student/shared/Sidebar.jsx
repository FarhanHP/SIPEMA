import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import { NavLink } from "react-router-dom";

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItem: {
    cursor: "pointer",
    color: theme.palette.text.secondary,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    "&.active": {
      backgroundColor: theme.palette.grey[100],
      "& p": {
        fontWeight: "500 !important",
        color: theme.palette.primary.main,
      },
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  listItemTypography: {
    fontSize: 16,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 16,
  },
}));

const sidebarItems = [
  {
    text: "Pengumuman",
    to: "/announcement",
  },
  {
    text: "Riwayat Bacaan",
    to: "/progress",
  },
  {
    text: "Pembayaran",
    to: "/payment",
  },
];

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List disableRipple className={classes.list}>
          {sidebarItems.map((item, index) => (
            <ListItem
              to={item.to}
              key={index}
              component={NavLink}
              className={classes.listItem}
            >
              <Typography className={classes.listItemTypography}>
                {item.text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
