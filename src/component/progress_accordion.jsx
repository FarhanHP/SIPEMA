import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, IconButton, makeStyles, Menu, MenuItem, Typography } from "@material-ui/core";
import {MoreVert as MoreVertIcon} from "@material-ui/icons";
import { Fragment, useState } from "react";
import {type as typeEnum} from "../enums/progress";
import moment from "moment";
import { renderBody } from "../utils";
import { blueGrey } from "@material-ui/core/colors";
import ProgressDialog from "./progress_dialog";

const useStyles = makeStyles(()=>{
  return {
    summary: {
      backgroundColor: blueGrey[50]
    }
  }
})

export default function ProgressAccordion(props){
  const classes = useStyles();

  const [tanggal, setTanggal] = useState(props.tanggal);
  const [type, setType] = useState(props.tipe);
  const [halAwal, setHalAwal] = useState(props.halAwal);
  const [halAkhir, setHalAkhir] = useState(props.halAkhir);
  const [suratAwal, setSuratAwal] = useState(props.suratAwal);
  const [suratAkhir, setSuratAkhir] = useState(props.suratAkhir)
  const [ayatAwal, setAyatAwal] = useState(props.ayatAwal);
  const [ayatAkhir, setAyatAkhir] = useState(props.ayatAkhir);
  const [comment, setComment] = useState(props.comment);

  const onDelete = props.onDelete;
  const onEdit = props.onEdit;

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleting, setDeleting] = useState(false);

  return (
    <Fragment>
      <Accordion square variant="outlined">
        <AccordionSummary className={classes.summary}>
          <Box flex={1}>
            <Typography>
              {moment.unix(tanggal).format("ll")}
            </Typography>
          </Box>

          {onDelete && onEdit ? (
            <Box>
              <IconButton size="small" onClick={(event) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
              }}>
                <MoreVertIcon/>
              </IconButton>

              <Menu 
                anchorEl={anchorEl} 
                open={anchorEl} 
                onClose={(event)=>{
                  event.stopPropagation()
                  setAnchorEl(null)
                }}
                onClick={(event)=>{
                  event.stopPropagation()
                }}
              >
                <MenuItem
                  onClick={()=>{
                    setOpenDialog(true);
                    setAnchorEl(null);
                  }}
                >
                  Edit
                </MenuItem>

                <MenuItem component={Button} disabled={deleting} onClick={()=>{
                  setDeleting(true);

                  onDelete().then(res => {
                    if(!res){
                      setDeleting(false)
                    }
                  })
                }}>
                  {deleting ? "MENGHAPUS..." : "HAPUS"}
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </AccordionSummary>

        <AccordionDetails>
          <Box>
            <Typography gutterBottom>
              {type === typeEnum.IQRA ? (
                `Iqra, ${halAwal} - ${halAkhir}`
              ) : (
                `Quran, ${suratAwal}(${ayatAwal}) - ${suratAkhir}(${ayatAkhir})`
              )}
            </Typography>

            <Typography>
              Komentar: 
            </Typography>
            <Typography>
              {comment ? renderBody(comment) : "Tidak ada komentar."}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Dialog open={openDialog} onClose={()=>{
        setOpenDialog(false)
      }}>
        <ProgressDialog
          headerTitle="Edit Riwayat Bacaan"
          btnTitle={{
            normal: "EDIT",
            loading: "MENGEDIT..."
          }}
          onSubmit={async (type, halAwal, halAkhir, suratAwal, suratAkhir, ayatAwal, ayatAkhir, comment, tanggal) => {
            return await onEdit(type, halAwal, halAkhir, suratAwal, suratAkhir, ayatAwal, ayatAkhir, comment, tanggal).then(res => {
              if(res){
                setType(type);
                setHalAwal(halAwal);
                setHalAkhir(halAkhir);
                setSuratAwal(suratAwal);
                setSuratAkhir(suratAkhir);
                setAyatAwal(ayatAwal);
                setAyatAkhir(ayatAkhir);
                setComment(comment);
                setTanggal(tanggal);

                setOpenDialog(false);

                return true;
              }

              else{
                return false;
              }
            })
          }}
          defaultType={type}
          defaultHalAwal={halAwal}
          defaultHalAkhir={halAkhir}
          defaultSuratAwal={suratAwal}
          defaultSuratAkhir={suratAkhir}
          defaultAyatAwal={ayatAwal}
          defaultAyatAkhir={ayatAkhir}
          defaultComment={comment}
          defaultTanggal={tanggal}
        />
      </Dialog>
    </Fragment>
  );
}