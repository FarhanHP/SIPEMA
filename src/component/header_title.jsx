import React from "react";
import { Box, Typography, Grid, Hidden } from "@material-ui/core";
import { AccessTime as TimeIcon } from "@material-ui/icons";
import moment from "moment";

export default function HeaderTitle(props) {
  const icon = props.icon;

  const title = props.title;

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Box display="flex">
          <Box my="auto" mr="10px">
            {icon}
          </Box>

          <Typography variant="h4">{title}</Typography>
        </Box>
      </Grid>

      <Hidden only="xs">
        <Grid item sm={4}>
          <Box display="flex" flexDirection="row-reverse" width="100%" height="100%">
            <Box my="auto">
              <Typography>{moment().format("ll")}</Typography>
            </Box>

            <Box mr="10px" display="flex" alignItems="center">
              <TimeIcon />
            </Box>
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
}
