import { Box, Divider, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Fragment } from "react";

const useStyles = makeStyles(theme => {
  return {
    avatar: {
      height: theme.spacing(5),
      width: theme.spacing(5),
      marginRight: "10px",
      marginTop: "auto",
      marginBottom: "auto",
    },
  };
});

export default function AnnouncementDetailLoading(props) {
  const classes = useStyles();

  const paragraphsCount = props.paragraphsCount;

  const paragraph = (
    <Fragment>
      <Skeleton width="100%" />

      <Skeleton width="100%" />

      <Skeleton width="100%" />

      <Skeleton width="100%" />

      <Skeleton width="80%" />

      <Box mb="32px" />
    </Fragment>
  );

  const paragraphs = [];

  for (let i = 0; i < paragraphsCount; i++) {
    paragraphs.push(paragraph);
  }

  return (
    <Fragment>
      <Box display="flex">
        <Skeleton variant="circle" className={classes.avatar} />

        <Box my="auto">
          <Skeleton width="150px" />

          <Skeleton width="100px" />
        </Box>
      </Box>

      <Box my="20px">
        <Divider />
      </Box>

      <Box display="flex" flexDirection="column">
        <Box mx="auto" mb="40px">
          <Skeleton width="200px" height="32px" />
        </Box>

        {paragraphs}
      </Box>
    </Fragment>
  );
}
