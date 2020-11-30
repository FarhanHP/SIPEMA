import React, {useState} from "react";
import Navbar from "./navbar";
import {Drawer, Box, Typography, IconButton, makeStyles, Hidden, Divider, Avatar, Tooltip, Button} from "@material-ui/core"
import {ArrowBackIos as ArrowBackIosIcon} from "@material-ui/icons"
import TeacherLinks from "./teacher/teacher_links";
import {Link} from "react-router-dom";

const useStyles = makeStyles(()=>{
  return {
    root: {
      backgroundColor: "white"
    }
  }
})

export default function Main(props){
  const loginUser = props.loginUser;

  const [openMenu, setOpenMenu] = useState(false);

  const classes = useStyles();

  const drawerContent = (
    <React.Fragment>
    <Box display="flex">
      <Hidden mdUp>
        <Box my="auto">
          <IconButton onClick={()=>{
            setOpenMenu(false)
          }}>  
            <ArrowBackIosIcon/>
          </IconButton>
        </Box>
      </Hidden>

      <Box p="20px">
        <Typography variant="h4">
          SIPEMA
        </Typography>
      </Box>
    </Box>
    
    <Button component={Link} to="/profile">
      <Box display="flex">
        <Avatar src={loginUser.pp}>
          {loginUser.fullname.charAt(0)}
        </Avatar>

        <Box ml="10px" my="auto" width="200px">
          <Tooltip title={loginUser.fullname}>
            <Typography variant="h6" noWrap>
              {loginUser.fullname}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
    </Button>
    
    <Box my="20px">
      <Divider />
    </Box>

    {loginUser.role === "teacher" ? (
      <TeacherLinks/>
    ) : null}
    </React.Fragment>
  );
  
  return (
    <React.Fragment>
      <Navbar loginUser={loginUser} onMenuButtonClick={()=>{
        setOpenMenu(true)
      }} />
      
      <Hidden smDown>
        <Drawer variant={"permanent"}>
          {drawerContent}
        </Drawer>
      </Hidden>

      <Hidden mdUp>
        <Drawer open={openMenu} onClose={()=>{
          setOpenMenu(false)
        }}>
          {drawerContent}
        </Drawer>
      </Hidden>

      <Box className={classes.root} width="100%" minHeight={"100vh"}>
        <Box pt={"70px"}>
          {props.children}
        </Box>
      </Box>
    </React.Fragment>
  );
}