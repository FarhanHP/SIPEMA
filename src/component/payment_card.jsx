import { Box, Button, Dialog, IconButton, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import { renderPrice } from "../utils";
import { MoreVert as MoreVertIcon} from "@material-ui/icons";
import { Fragment, useState } from "react";
import PaymentDialog from "./payment_dialog";

export default function PaymentCard(props){
  const [tanggal, setTanggal] = useState(props.tanggal);
  const [amount, setAmount] = useState(props.amount);
  const onDelete = props.onDelete;
  const onEdit = props.onEdit;

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <Box component={Paper} py="20px" px="5px" display="flex" variant="outlined" square>
        <Box flex={1}>
          <Typography gutterBottom>
            <b>{moment.unix(tanggal).format("ll")}</b>
          </Typography>

          <Typography gutterBottom>
            <b>Rp{renderPrice(amount)}</b>
          </Typography>
        </Box>

        {onDelete && onEdit ? (
          <Box>
            <IconButton 
              onClick={(event)=>{
                setAnchorEl(event.currentTarget);
              }}
              size="small"
            >
              <MoreVertIcon/>
            </IconButton>

            <Menu
              open={anchorEl}
              anchorEl={anchorEl}
              onClose={()=>{
                setAnchorEl(null);
              }}
            >
              <MenuItem onClick={()=>{
                setAnchorEl(null);
                
                setOpenDialog(true);
              }}>
                Edit
              </MenuItem>

              <MenuItem 
                component={Button} 
                onClick={()=>{
                  setDeleting(true);

                  onDelete().then(res => {
                    if(!res){
                      setDeleting(false)
                    }
                  })
                }}
                disabled={deleting}
              >
                {deleting ? "MENGHAPUS..." : "HAPUS" }
              </MenuItem>
            </Menu>
          </Box> 
        ): null}
      </Box>

      {/*Mengedit pembayaran*/}
      <Dialog 
        open={openDialog}
        onClose={()=>{
          setOpenDialog(false);
        }}
        fullWidth
      >
        <PaymentDialog
          headerTitle="Edit Riwayat Pembayaran Murid"
          btnTitle={{
            normal: "EDIT",
            loading: "MENGEDIT..."
          }}
          onSubmit={async (amount, date)=>{
            return await onEdit(amount, date).then(res => {
              if(res){
                setAmount(amount);
                setTanggal(date);
                setOpenDialog(false);
                return true;
              }

              else{
                return false;
              }
            })
          }}
          defaultAmount={amount}
          defaultDate={tanggal}
        />
      </Dialog>
      {/*Mengedit pembayaran end*/}
    </Fragment>
  );
}