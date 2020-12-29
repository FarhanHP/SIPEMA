import { Fragment } from "react";
import { Skeleton } from "@material-ui/lab";
import { Box } from "@material-ui/core";

export default function StudentDetailContentLoading(props) {
  const number = props.number;

  const content = [];
  for (let i = 0; i < number; i++) {
    content.push(
      <Box mb="20px">
        <Skeleton width="100%" height="75px" variant="rect" />
      </Box>,
    );
  }

  return <Fragment>{content}</Fragment>;
}
