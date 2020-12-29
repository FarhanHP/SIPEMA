import { Box, Button, Dialog, Fab, makeStyles, Snackbar, Typography } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createProgress,
  deleteProgress,
  editProgress,
  getProgressByStudentId,
} from "../../../../request/progress";
import { Add as AddIcon } from "@material-ui/icons";
import { getLoginToken } from "../../../../local_storage";
import { Skeleton } from "@material-ui/lab";
import ProgressDialog from "../../../../component/progress_dialog/index";
import ProgressAccordion from "../../../../component/progress_accordion";

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
  };
});

export default function Progress() {
  const classes = useStyles();

  const { studentId } = useParams();

  const [loading, setLoading] = useState(true);
  const [progresses, setProgresses] = useState([]);
  const [loadable, setLoadable] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [sbMsg, setSbMsg] = useState(null);

  const loadingEl = [];
  const limit = 5;

  for (let i = 0; i < limit; i++) {
    loadingEl.push(
      <Box mb="20px">
        <Skeleton variant="rect" height="80px" width="100%" />
      </Box>,
    );
  }

  useEffect(() => {
    getProgressByStudentId(getLoginToken(), studentId, 0, limit).then(res => {
      if (res.ok) {
        res.json().then(data => {
          const newProgresses = data.progresses;
          const count = data.count;

          setLoadable(newProgresses.length < count);
          setProgresses(newProgresses);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [studentId]);

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" width="100%" minHeight="50vh">
        {progresses.map(value => {
          const _id = value._id;
          const halAwal = value.hal_awal;
          const halAkhir = value.hal_akhir;
          const suratAwal = value.surat_awal;
          const suratAkhir = value.surat_akhir;
          const ayatAwal = value.ayat_awal;
          const ayatAkhir = value.ayat_akhir;
          const comment = value.comment;
          const tanggal = value.tanggal;
          const type = value.type;

          return (
            <Box mb="10px">
              <ProgressAccordion
                key={_id}
                halAwal={halAwal}
                halAkhir={halAkhir}
                suratAwal={suratAwal}
                suratAkhir={suratAkhir}
                ayatAwal={ayatAwal}
                ayatAkhir={ayatAkhir}
                comment={comment}
                tanggal={tanggal}
                tipe={type}
                onDelete={async () => {
                  return deleteProgress(getLoginToken(), _id).then(res => {
                    if (res.ok) {
                      const limit = progresses.length;
                      setSbMsg("Berhasil menghapus");
                      setLoading(true);
                      setProgresses([]);
                      getProgressByStudentId(getLoginToken(), studentId, 0, limit).then(res => {
                        if (res.ok) {
                          res.json().then(data => {
                            const newProgresses = data.progresses;
                            const count = data.count;
                            setLoadable(newProgresses.length < count);
                            setProgresses(newProgresses);
                            setLoading(false);
                          });
                        } else {
                          setLoading(false);
                        }
                      });
                      return true;
                    } else {
                      setSbMsg("Gagal menghapus");
                      return false;
                    }
                  });
                }}
                onEdit={async (
                  type,
                  halAwal,
                  halAkhir,
                  suratAwal,
                  suratAkhir,
                  ayatAwal,
                  ayatAkhir,
                  comment,
                  tanggal,
                ) => {
                  return await editProgress(getLoginToken(), _id, {
                    type: type,
                    hal_awal: halAwal,
                    hal_akhir: halAkhir,
                    surat_awal: suratAwal,
                    surat_akhir: suratAkhir,
                    ayat_awal: ayatAwal,
                    ayat_akhir: ayatAkhir,
                    comment: comment,
                    tanggal: tanggal,
                  }).then(res => {
                    if (res.ok) {
                      setSbMsg("Berhasil mengedit riwayat bacaan");
                      return true;
                    } else {
                      setSbMsg("Gagal mengedit riwayat bacaan");
                      return false;
                    }
                  });
                }}
              />
            </Box>
          );
        })}

        {loading ? (
          loadingEl
        ) : loadable ? (
          <Box width="100%" py="20px" display="flex" alignContent="center" justifyContent="center">
            <Button
              color="primary"
              onClick={() => {
                setLoading(true);

                getProgressByStudentId(getLoginToken(), studentId, progresses.length, limit).then(
                  res => {
                    if (res.ok) {
                      res.json().then(data => {
                        const oldProgresses = progresses.slice();
                        const newProgresses = oldProgresses.concat(data.progresses);
                        const count = data.count;
                        setLoadable(newProgresses.length < count);
                        setProgresses(newProgresses);
                        setLoading(false);
                      });
                    } else {
                      setLoading(false);
                    }
                  },
                );
              }}
            >
              MUAT LEBIH BANYAK
            </Button>
          </Box>
        ) : progresses.length <= 0 ? (
          <Box m="auto">
            <Typography variant="h6" align="center" gutterBottom>
              KOSONG
            </Typography>
          </Box>
        ) : null}
      </Box>

      <Fab
        color="primary"
        size="small"
        className={classes.fab}
        onClick={() => {
          setOpenCreateDialog(true);
        }}
      >
        <AddIcon />
      </Fab>

      {/*Membuat riwayat bacaan*/}
      <Dialog
        open={openCreateDialog}
        onClose={() => {
          setOpenCreateDialog(false);
        }}
        fullWidth
      >
        <ProgressDialog
          headerTitle={"Tambah Riwayat Bacaan Murid"}
          btnTitle={{
            normal: "BUAT",
            loading: "MEMBUAT...",
          }}
          onSubmit={async (
            type,
            halAwal,
            halAkhir,
            suratAwal,
            suratAkhir,
            ayatAwal,
            ayatAkhir,
            comment,
            tanggalUnix,
          ) => {
            return await createProgress(getLoginToken(), studentId, {
              type,
              hal_awal: Number(halAwal),
              hal_akhir: Number(halAkhir),
              surat_awal: suratAwal,
              surat_akhir: suratAkhir,
              ayat_awal: Number(ayatAwal),
              ayat_akhir: Number(ayatAkhir),
              comment: comment,
              tanggal: tanggalUnix,
            }).then(res => {
              if (res.ok) {
                setSbMsg("Berhasil menambahkan");
                setOpenCreateDialog(false);
                setLoading(true);
                const limit = progresses.length + 1;
                setProgresses([]);
                getProgressByStudentId(getLoginToken(), studentId, 0, limit).then(res => {
                  if (res.ok) {
                    res.json().then(data => {
                      const count = data.count;
                      const newProgresses = data.progresses;
                      setLoadable(newProgresses.length < count);
                      setProgresses(newProgresses);
                      setLoading(false);
                    });
                  } else {
                    setLoading(false);
                  }
                });
                return true;
              } else {
                setSbMsg("Gagal menambahkan");
                return false;
              }
            });
          }}
        />
      </Dialog>
      {/*Membuat riwayat bacaan end*/}

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        message={sbMsg}
        open={sbMsg}
        key={sbMsg}
        autoHideDuration={3000}
        onClose={() => {
          setSbMsg(null);
        }}
      />
    </Fragment>
  );
}
