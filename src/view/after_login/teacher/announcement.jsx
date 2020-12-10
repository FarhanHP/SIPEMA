import React, {useState} from "react";
import { useSelector } from "react-redux";
import { AnnouncementOutlined as AnnouncementIcon, Add as AddIcon } from "@material-ui/icons"
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";
import { Helmet } from "react-helmet";
import { Dialog, DialogContent, DialogTitle, Fab, makeStyles, TextField } from "@material-ui/core";
import CreateAnnouncementDialog from "../../../component/create_announcement_dialog";

const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "absolute",

      [theme.breakpoints.up("xs")]:{
        right: theme.spacing(1),
        bottom: theme.spacing(1)
      },

      [theme.breakpoints.up("xs")]:{
        right: theme.spacing(2),
        bottom: theme.spacing(2)
      }
    }
  }
})

export default function Announcement(){
  const classes = useStyles();

  const loginUser = useSelector(state => {
    return state.loginUser
  })

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <React.Fragment>
      <Helmet>
        <title>Pengumuman SIPEMA</title>
      </Helmet>

      <Main loginUser={loginUser}>
        <HeaderTitle icon={<AnnouncementIcon fontSize="large" />}  title="Pengumuman"/>

        <Fab className={classes.fab} color="primary" size="small">
          <AddIcon/>
        </Fab>
      </Main>

      <Dialog>
        <CreateAnnouncementDialog handleSubmit={(title, desc) => {
          
        }} />
      </Dialog>
    </React.Fragment>
  );
}
