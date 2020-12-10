import { useState } from "react";
import {
  Box,
  Avatar,
  Paper,
  Typography,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      height: theme.spacing(8),
      width: theme.spacing(8),
      fontSize: "50px",
    },
    greyColor: {
      color: "grey",
    },
  };
});

export default function StudentCard(props) {
  const student = props.student;

  const pp = student.user.pp;
  const fullname = student.user.fullname;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const [kicking, setKicking] = useState(false);

  const onKick = () => {
    setKicking(true);

    const res = props.onKick();

    res.then((value) => {
      if (!value) {
        setKicking(false);
      }
    });
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      p="10px"
      my="10px"
      display="flex"
      width={{
        xs: "100%",
        sm: "500px",
      }}
    >
      <Box my="auto" mr="5px">
        <Avatar className={classes.avatar} src={pp}>
          {fullname.charAt(0)}
        </Avatar>
      </Box>

      <Box my="auto" width="100%">
        <Typography>
          <b>{fullname}</b>
        </Typography>

        <Typography className={classes.greyColor}>Murid</Typography>
      </Box>

      <Box>
        <IconButton
          size="small"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <MoreVertIcon size="small" />
        </IconButton>

        <Menu
          open={anchorEl}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
        >
          <MenuItem>Lihat Detil</MenuItem>

          <MenuItem component={Button} disabled={kicking} onClick={onKick}>
            {kicking ? "MENENDANG..." : "TENDANG"}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
