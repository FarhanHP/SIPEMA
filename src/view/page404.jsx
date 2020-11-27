import { Box, Typography } from "@material-ui/core";
import { site } from "../setting";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <Box display="flex" minHeight="100vh" width="100%">
      <Box margin="auto">
        <Typography variant="h5" align="center" gutterBottom>
          ERROR 404: Halaman yang kamu cari tidak ditemukan :(
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          <Link href={"/"}>{site}</Link>
        </Typography>
      </Box>
    </Box>
  );
}
