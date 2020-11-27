import { LocalDining } from "@material-ui/icons";

import { Box, CircularProgress } from "@material-ui/core";

export default function Loading() {
  return (
    <Box display="flex" minHeight="100vh" width="100%">
      <Box margin="auto">
        <CircularProgress number={100} />
      </Box>
    </Box>
  );
}
