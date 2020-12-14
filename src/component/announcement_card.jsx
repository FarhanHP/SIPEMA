import moment from "moment";
import {Box, Button, ButtonBase, IconButton, makeStyles, Menu, MenuItem, Paper, Typography} from "@material-ui/core";
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple'
import {MoreVert as MoreVertIcon} from "@material-ui/icons"
import { useState } from "react";

const useStyles = makeStyles(()=>{
  return {
    created: {
      color: "grey"
    }
  }
})

export default function AnnouncementCard(props){
  const classes = useStyles();

  const announcement = props.announcement;

  const title = announcement.title;

  const body = announcement.body;

  const created = announcement.created;

  const onDelete = props.onDelete;

  const [anchorEl, setAnchorEl] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = ()=>{
    setAnchorEl(null);
  }

  const onBodyClick = props.onBodyClick;

  return (
    <Box 
      mx="auto"
      my="10px"
      width={{
        xs: "100%",
        sm: "500px"
      }}
      component={Paper} 
      height="140px"
      p="10px"
      elevation={3}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex">
        <Box width="90%" component={ButtonBase} onClick={onBodyClick} justifyContent="left">
          <Typography variant="h6" gutterBottom noWrap align="left">
            {title}
          </Typography>
        </Box>

        {onDelete ? (
          <Box display="flex" width="10%" flexDirection={"row-reverse"}>
            <IconButton size={"small"} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>

            <Menu 
              open={anchorEl} 
              anchorEl={anchorEl}
              onClose={handleClose}
            >
              <MenuItem component={Button} disabled={deleting} onClick={()=>{
                setDeleting(true);

                const res = onDelete();

                res.then(value => {
                  if(!value){
                    setDeleting(false);
                  }
                })
              }}>
                {deleting ? "MENGHAPUS..." : "HAPUS"}
              </MenuItem>
            </Menu>
          </Box>
        ) : null}
      </Box>

      <Typography align="justify" gutterBottom noWrap onClick={onBodyClick}>
        {body}
      </Typography>

      <Box display="flex" flexDirection="column-reverse" flex={1} onClick={onBodyClick}>
        <Typography align="right" className={classes.created}>
          {moment.unix(created).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
}