import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { History as HistoryIcon } from "@material-ui/icons";
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";
import { Helmet } from "react-helmet";
import { getLogs } from "../../../request/log";
import {
  Skeleton,
  Timeline,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
} from "@material-ui/lab";
import { getLoginToken } from "../../../local_storage";
import {
  Avatar,
  Box,
  Button,
  Chip,
  makeStyles,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import moment from "moment";

const FTimelineItem = withStyles({
  missingOppositeContent: {
    "&:before": {
      display: "none",
    },
  },
})(TimelineItem);

const useStyles = makeStyles(() => {
  return {
    time: {
      color: "grey",
      fontSize: "0.9rem",
    },
  };
});

export default function ActivityLog() {
  const classes = useStyles();

  const loginUser = useSelector(state => {
    return state.loginUser;
  });

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadable, setLoadable] = useState(false);

  const loadingElement = [];

  for (let i = 0; i < 10; i++) {
    loadingElement.push(
      <Box my="10px">
        <Skeleton variant="rect" height="60px" width="100%" />
      </Box>,
    );
  }

  useEffect(() => {
    getLogs(getLoginToken(), 0, 10).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setLogs(data.logs);

          const total = data.total;

          setLoadable(data.logs.length < total);

          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  let currentDate = null;

  return (
    <Fragment>
      <Helmet>
        <title>Aktivitas Pengguna SIPEMA</title>
      </Helmet>

      <Main loginUser={loginUser}>
        <HeaderTitle icon={<HistoryIcon fontSize="large" />} title="Log Aktivitas Pengguna" />

        <Box
          pl={{
            xs: 0,
            lg: "100px",
          }}
          mt="50px"
        >
          <Timeline>
            {logs.map((value, index, array) => {
              const created = value.created;

              const fullname = value.user.fullname;

              const desc = value.desc;

              const pp = value.user.pp;

              const date = moment.unix(created).format("ll");

              let dateChange = false;

              if (currentDate !== date) {
                currentDate = date;
                dateChange = true;
              }

              return (
                <Fragment>
                  {dateChange ? (
                    <Box my="20px">
                      <Chip label={date} />
                    </Box>
                  ) : null}

                  <FTimelineItem key={value._id}>
                    <TimelineSeparator>
                      <TimelineDot />

                      {array.length - 1 === index ? null : <TimelineConnector />}
                    </TimelineSeparator>

                    <TimelineContent>
                      <Box display="flex" component={Paper} elevation={3} p="10px">
                        <Box width="100%" display="flex">
                          <Box display="flex" alignItems="center" mr="10px">
                            <Avatar src={pp}>{fullname.charAt(0)}</Avatar>
                          </Box>

                          <Box display="flex" alignItems="center">
                            <Typography>
                              <b>{fullname}</b> {desc}
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <Typography className={classes.time}>
                            {moment.unix(created).format("LT")}
                          </Typography>
                        </Box>
                      </Box>
                    </TimelineContent>
                  </FTimelineItem>
                </Fragment>
              );
            })}

            {loading ? loadingElement : null}
          </Timeline>

          {!loading && loadable ? (
            <Box width="100%" display="flex" justifyContent="center" pb="50px">
              <Button
                color="primary"
                onClick={() => {
                  setLoading(true);

                  const start = logs.length - 1;

                  getLogs(getLoginToken(), start, 10).then(res => {
                    if (res.ok) {
                      res.json().then(data => {
                        const total = data.total;

                        let newLogs = logs.slice();

                        newLogs = newLogs.concat(data.logs);

                        setLoadable(newLogs.length < total);

                        setLogs(newLogs);

                        setLoading(false);
                      });
                    } else {
                      setLoading(false);
                    }
                  });
                }}
              >
                MUAT LEBIH BANYAK
              </Button>
            </Box>
          ) : null}
        </Box>
      </Main>
    </Fragment>
  );
}
