import { Avatar, Box, makeStyles, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import moment from "moment";
import { blueGrey } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles(theme => {
  return {
    header: {
      backgroundColor: blueGrey[100],
    },

    avatar: {
      height: theme.spacing(10),
      width: theme.spacing(10),
    },
  };
});

export default function StudentDetailLayout(props) {
  const classes = useStyles();

  const student = props.student;
  const fullname = student.fullname;
  const email = student.email;
  const created = student.created;
  const pp = student.pp;

  const tabs = props.tabs;

  const location = window.location.pathname;

  return (
    <Box component={Paper} elevation={3} overflow="hidden" mb="20px">
      <Box
        pt="20px"
        px="20px"
        display="flex"
        width="100%"
        className={classes.header}
        mb="20px"
        flexDirection="column"
      >
        <Box mx="auto" display="flex" flexDirection="column">
          <Box mb="20px" mx="auto">
            <Avatar src={pp} className={classes.avatar}>
              {fullname.charAt(0)}
            </Avatar>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {fullname}
          </Typography>

          <Typography align="center" gutterBottom>
            {email}
          </Typography>

          <Typography align="center" gutterBottom>
            Murid
          </Typography>

          <Typography align="center" gutterBottom>
            Bergabung pada <b>{moment.unix(created).format("llll")}</b>
          </Typography>

          <Tabs value={location} indicatorColor="primary" centered>
            {tabs.map(value => {
              return <Tab label={value.label} value={value.url} component={Link} to={value.url} />;
            })}
          </Tabs>
        </Box>
      </Box>

      <Box
        px={{
          lg: "25%",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
