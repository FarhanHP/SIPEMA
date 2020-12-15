import { Avatar, Box, Button, Divider, IconButton, makeStyles, Menu, MenuItem, Typography, Snackbar, Dialog } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../component/main";
import { getLoginToken } from "../../../local_storage";
import { deleteAnnouncement, editAnnouncement, getAnnouncementDetail } from "../../../request/announcement";
import moment from "moment";
import { renderBody } from "../../../utils";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";
import AnnouncementDetailLoading from "../../../component/loading/announcement_detail_loading";
import AnnouncementDialog from "../../../component/announcement_dialog";

const useStyles = makeStyles(theme => {
  return {
    avatar: {
      height: theme.spacing(5),
      width: theme.spacing(5),
      marginRight: "10px",
      marginTop: "auto",
      marginBottom: "auto"
    },

    greyColor: {
      color: "grey"
    }
  }
})

export default function AnnouncementDetail(){
  const classes = useStyles();

  const {announcementId} = useParams();

  const loginUser = useSelector(state => {
    return state.loginUser
  })

  const [announcement, setAnnouncement] = useState(null);

  const [title, setTitle] = useState("Pengumuman");

  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const [sbMsg, setSbMsg] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const announcementNotFoundComponent = (
    <Box minHeight="70vh" display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h5">
        Pengumuman tidak ditemukan.
      </Typography>
    </Box>
  );

  let announcementComponent = null;

  if(announcement){
    const teacher = announcement.teacher;

    const pp = teacher.pp;

    const fullname = teacher.fullname;

    const created = announcement.created;

    const title = announcement.title;

    const body = announcement.body;

    const isOwner = announcement.is_owner;

    announcementComponent = (
      <Fragment>
        <Box display="flex">
          <Box display="flex" width="90%">
            <Avatar src={pp} className={classes.avatar}>
              {fullname.charAt(0)}
            </Avatar>

            <Box my="auto">
              <Typography variant="h6">
                {fullname}
              </Typography>

              <Typography className={classes.greyColor}>
                {moment.unix(created).format("llll")}
              </Typography>
            </Box>
          </Box>

          {isOwner ? (
            <Box display="flex" width="10%" flexDirection="row-reverse">
              <Box my="auto">
                <IconButton size="small" onClick={event=>{
                setAnchorEl(event.currentTarget)
              }}>
                <MoreVertIcon/>
              </IconButton>
              </Box>

              <Menu open={anchorEl} anchorEl={anchorEl} onClose={()=>{
                setAnchorEl(null);
              }}>
                <MenuItem 
                  component={Button} 
                  onClick={()=>{
                    setOpenDialog(true);

                    setAnchorEl(null);
                  }}
                >
                  EDIT
                </MenuItem>

                <MenuItem 
                  component={Button} 
                  disabled={deleting} 
                  onClick={()=>{
                    setDeleting(true);

                    deleteAnnouncement(announcementId, getLoginToken()).then(res => {
                      if(res.ok){
                        setAnnouncement(null);

                        setSbMsg("Berhasil menghapus pengumuman");
                      }

                      else{
                        setSbMsg("Gagal menghapus pengumuman")

                        setDeleting(false);
                      }
                    })
                  }}
                >
                  {deleting ? "MENGHAPUS..." : "HAPUS"}
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </Box>

        <Box my="20px">
          <Divider/>
        </Box>

        <Box display="flex" flexDirection="column" mb="50px">
          <Box mb="40px">
            <Typography variant="h5" align="center">
              {title}
            </Typography>
          </Box>

          <Typography align="justify">
            {renderBody(body)}
          </Typography>
        </Box>

        <Dialog 
          open={openDialog} 
          onClose={()=>{
            setOpenDialog(false)
          }}
          fullWidth
        >
          <AnnouncementDialog 
            defaultTitle={announcement.title}
            defaultBody={announcement.body}
            headerTitle="Mengedit Pengumuman"
            btnName={{
              normal: "EDIT",
              loading: "MENGEDIT..."
            }}
            handleSubmit={async (title, desc) => {
              return await editAnnouncement(announcementId, title, desc, getLoginToken()).then(res => {
                if(res.ok){
                  setSbMsg("Berhasil mengedit pengumuman.");

                  setOpenDialog(false);

                  const newAnnouncement = {...announcement};

                  newAnnouncement.title = title;
                  newAnnouncement.body = desc;

                  setAnnouncement(newAnnouncement)
                  
                  return true;
                }
                else{
                  setSbMsg("Gagal mengedit pengumuman.");

                  return false;
                }
              })
            }} 
          />
        </Dialog>
      </Fragment>
    );
  }

  useEffect(()=>{
    getAnnouncementDetail(announcementId, getLoginToken()).then(res => {
      if(res.ok){
        res.json().then(data => {
          setAnnouncement(data);

          setTitle(data.title)

          setLoading(false)
        })
      }

      else{
        setLoading(false)
      }
    })
  }, [announcementId])

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Main loginUser={loginUser}>
        {loading ? (
          <AnnouncementDetailLoading paragraphsCount={3} />
        ) : !announcement ? (
          announcementNotFoundComponent
        ) : (
          announcementComponent
        )}
      </Main>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        message={sbMsg}
        open={sbMsg}
        key={sbMsg}
        autoHideDuration={6000}
        onClose={() => {
          setSbMsg(null);
        }}
      />
    </Fragment>
  );
}