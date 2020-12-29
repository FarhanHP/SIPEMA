import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnnouncementOutlined as AnnouncementIcon, Add as AddIcon } from "@material-ui/icons";
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";
import { Helmet } from "react-helmet";
import { Box, Button, Dialog, Fab, makeStyles, Snackbar, Typography } from "@material-ui/core";
import AnnouncementDialog from "../../../component/announcement_dialog";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
} from "../../../request/announcement";
import { getLoginToken } from "../../../local_storage";
import { Skeleton } from "@material-ui/lab";
import AnnouncementCard from "../../../component/announcement_card";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",

      [theme.breakpoints.up("xs")]: {
        right: theme.spacing(1),
        bottom: theme.spacing(1),
      },

      [theme.breakpoints.up("xs")]: {
        right: theme.spacing(2),
        bottom: theme.spacing(2),
      },
    },

    created: {
      color: "grey",
    },
  };
});

export default function Announcement() {
  const hist = useHistory();

  const classes = useStyles();

  const loginUser = useSelector(state => {
    return state.loginUser;
  });

  const [openDialog, setOpenDialog] = useState(false);

  const [sbMsg, setSbMsg] = useState(null);

  const [announcements, setAnnouncements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadable, setLoadable] = useState(false);

  const loadingElement = [];

  const limit = 5;

  useEffect(() => {
    getAnnouncements(0, limit, getLoginToken()).then(res => {
      if (res.ok) {
        res.json().then(data => {
          const newAnnouncements = data.announcements;
          const count = data.count;

          setAnnouncements(newAnnouncements);

          setLoadable(count > newAnnouncements.length);

          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  for (let i = 0; i < limit; i++) {
    loadingElement.push(
      <Box
        my="10px"
        mx="auto"
        height="140px"
        width={{
          xs: "100%",
          sm: "500px",
        }}
      >
        <Skeleton variant="rect" width="100%" height="100%" />
      </Box>,
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>Pengumuman SIPEMA</title>
      </Helmet>

      <Main loginUser={loginUser}>
        <HeaderTitle icon={<AnnouncementIcon fontSize="large" />} title="Pengumuman" />

        <Box minHeight="75vh" width="100%" display="flex" flexDirection="column">
          {announcements.length <= 0 && !loading ? (
            <Box margin="auto">
              <Typography variant="h6">Tidak ada pengumuman.</Typography>
            </Box>
          ) : (
            <Fragment>
              <Box my="25px" />

              {announcements.map(value => {
                const announcementId = value._id;

                const isOwner = value.is_owner;

                return (
                  <AnnouncementCard
                    onBodyClick={() => {
                      hist.push(`/a/${announcementId}`);
                    }}
                    announcement={value}
                    onDelete={
                      isOwner
                        ? async () => {
                            return await deleteAnnouncement(announcementId, getLoginToken()).then(
                              res => {
                                if (res.ok) {
                                  setSbMsg("Berhasil menghapus pengumuman.");

                                  setLoading(true);

                                  const limit = announcements.length;

                                  setAnnouncements([]);

                                  getAnnouncements(0, limit, getLoginToken()).then(res => {
                                    if (res.ok) {
                                      res.json().then(data => {
                                        const newAnnouncements = data.announcements;

                                        const count = data.count;

                                        setAnnouncements(newAnnouncements);

                                        setLoadable(count > newAnnouncements.length);

                                        setLoading(false);
                                      });
                                    } else {
                                      setLoading(false);
                                    }
                                  });

                                  return true;
                                } else {
                                  setSbMsg("Gagal menghapus pengumuman.");

                                  return false;
                                }
                              },
                            );
                          }
                        : null
                    }
                  />
                );
              })}

              {loading ? (
                loadingElement
              ) : loadable ? (
                <Box py="20px" display="flex" justifyContent="center">
                  <Button
                    color="primary"
                    onClick={() => {
                      const start = announcements.length;

                      setLoading(true);

                      getAnnouncements(start, limit, getLoginToken()).then(res => {
                        if (res.ok) {
                          res.json().then(data => {
                            const count = data.count;

                            const newAnnouncements = announcements.concat(data.announcements);

                            setAnnouncements(newAnnouncements);

                            setLoadable(count > newAnnouncements.length);

                            setLoading(false);
                          });
                        } else {
                          setLoading(false);
                        }
                      });
                    }}
                  >
                    MUAT LEBIH BANYAK
                  </Button>
                </Box>
              ) : null}
            </Fragment>
          )}
        </Box>

        <Fab
          className={classes.fab}
          color="primary"
          size="small"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Main>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        fullWidth
      >
        <AnnouncementDialog
          headerTitle="Membuat Pengumuman"
          btnName={{
            normal: "BUAT",
            loading: "MEMBUAT...",
          }}
          handleSubmit={async (title, desc) => {
            return await createAnnouncement(title, desc, getLoginToken()).then(res => {
              if (res.ok) {
                setSbMsg("Berhasil membuat pengumuman.");

                setOpenDialog(false);

                setLoading(true);

                getAnnouncements(0, announcements.length, getLoginToken()).then(res => {
                  if (res.ok) {
                    res.json().then(data => {
                      const count = data.count;

                      const newAnnouncements = data.announcements;

                      setAnnouncements(newAnnouncements);

                      setLoadable(count > newAnnouncements.length);

                      setLoading(false);
                    });
                  } else {
                    setLoading(false);
                  }
                });

                setAnnouncements([]);

                return true;
              } else {
                setSbMsg("Gagal membuat pengumuman.");

                return false;
              }
            });
          }}
        />
      </Dialog>

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
