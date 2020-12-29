import { Box, makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import StudentDetailContentLoading from "./student_detail_content_loading";

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

export default function StudentDetailLoading(props) {
  const classes = useStyles();

  const tabs = props.tabs;

  const location = window.location.pathname;

  const number = props.number;

  return (
    <Box component={Paper} elevation={3} overflow="hidden">
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
            <Skeleton variant="circle" className={classes.avatar} />
          </Box>

          <Box mx="auto" mb="10px">
            <Skeleton width="200px" height="32px" />
          </Box>

          <Box mx="auto" mb="10px">
            <Skeleton width="160px" height="24px" />
          </Box>

          <Box mx="auto" mb="10px">
            <Skeleton width="100px" height="24px" />
          </Box>

          <Box mx="auto" mb="10px">
            <Skeleton width="280px" height="24px" />
          </Box>

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
        <StudentDetailContentLoading number={number} />
      </Box>
    </Box>
  );
}
