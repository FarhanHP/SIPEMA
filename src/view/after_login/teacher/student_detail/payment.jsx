import { Box, Button, Dialog, Fab, makeStyles, Snackbar, Typography } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import {Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaymentCard from "../../../../component/payment_card";
import PaymentDialog from "../../../../component/payment_dialog";
import { getLoginToken } from "../../../../local_storage";
import { createPayment, deletePayment, editPayment, getPaymentByStudentId } from "../../../../request/payment";

const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",

      [theme.breakpoints.up("xs")]:{
        right: theme.spacing(1),
        bottom: theme.spacing(1)
      },

      [theme.breakpoints.up("xs")]:{
        right: theme.spacing(2),
        bottom: theme.spacing(2)
      }
    },
  }
})

export default function Payment(){
  const classes = useStyles();

  const {studentId} = useParams();

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [loadable, setLoadable] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [sbMsg, setSbMsg] = useState(null);
  
  const loadingEl = []
  const limit = 5;
  
  for(let i=0; i<limit; i++){
    loadingEl.push(
      <Box mb="20px">
        <Skeleton variant="rect" height="80px" width="100%"/>
      </Box>
    )
  }

  useEffect(()=>{
    getPaymentByStudentId(getLoginToken(), studentId, 0, limit).then(res => {
      if(res.ok){
        res.json().then(data => {
          const newPayments = data.payments;
          const count = data.count

          setLoadable(newPayments.length < count);
          setPayments(newPayments);
          setLoading(false);
        })
      }
      else{
        setLoading(false);
      }
    })
  }, [studentId])

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" width="100%" minHeight="50vh">
        {payments.map(value => {
          const _id = value._id;
          const amount = value.amount;
          const tanggal = value.tanggal;

          return (
            <Box mb="10px">
              <PaymentCard 
                key={_id} 
                amount={amount} 
                tanggal={tanggal} 
                onDelete={async ()=>{
                return await deletePayment(getLoginToken(), _id).then(res => {
                  if(res.ok){
                    setSbMsg("Berhasil menghapus.");
                    setLoading(true)
                    
                    getPaymentByStudentId(getLoginToken(), studentId, 0, payments.length+1).then(res=> {
                      if(res.ok){
                        res.json().then(data => {
                          const count = data.count;
                          const newPayments = data.payments;

                          setLoadable(newPayments.length < count);
                          setPayments(newPayments);

                          setLoading(false);
                        })
                      }

                      else{
                        setLoading(false);
                      }
                    })

                    setPayments([])

                    return true
                  }
                  else{
                    setSbMsg("Gagal menghapus.");

                    return false;
                  }
                })
                }}
                onEdit={async (amount, tanggal)=>{
                  return await editPayment(getLoginToken(), _id, amount, tanggal).then(res => {
                    if(res.ok){
                      setSbMsg("Berhasil mengedit")
                      return true;
                    }
                    else{
                      setSbMsg("Gagal mengedit")
                      return false;
                    }
                  })
                }} 
              />
            </Box>
          );
        })}

        {loading ? loadingEl : loadable ? (
          <Box 
            width="100%" 
            py="20px" 
            display="flex" 
            alignContent="center" 
            justifyContent="center">
              <Button
                color="primary"
                onClick={()=> {
                  setLoading(true);

                  getPaymentByStudentId(getLoginToken(), studentId, payments.length, limit).then(res => {
                    if(res.ok){
                      res.json().then(data => {
                        const oldPayments = payments.slice()
                        const newPayments = oldPayments.concat(data.payments);
                        const count = data.count;
                        setLoadable(newPayments.length < count);
                        setPayments(newPayments);
                        setLoading(false);
                      })
                    }

                    else{
                      setLoading(false);
                    }
                  })
                }}
              >
                MUAT LEBIH BANYAK
              </Button>
          </Box>
        ) : payments.length <= 0 ? (
          <Box m="auto">
            <Typography variant="h6" align="center" gutterBottom>
              KOSONG
            </Typography>
          </Box>
        ) : null}
      </Box>

      <Fab color="primary" size="small" className={classes.fab} onClick={()=>{
        setOpenCreateDialog(true);
      }}>
        <AddIcon/>
      </Fab>

      {/*Membuat pembayaran*/}
      <Dialog 
        open={openCreateDialog}
        onClose={()=>{
          setOpenCreateDialog(false);
        }}
        fullWidth
      >
        <PaymentDialog
          headerTitle="Tambah Riwayat Pembayaran Murid"
          btnTitle={{
            normal: "BUAT",
            loading: "MEMBUAT..."
          }}
          onSubmit={async (amount, date)=>{
            return await createPayment(getLoginToken(), studentId, amount, date).then(res => {
              if(res.ok){
                setOpenCreateDialog(false);
                setLoading(true);
                setPayments([]);
                setSbMsg("Berhasil membuat pembayaran");
                const limit = payments.length+1;
                getPaymentByStudentId(getLoginToken(), studentId, 0, limit).then(res => {
                  if(res.ok){
                    res.json().then(data => {
                      const newPayments = data.payments;
                      const count = data.count;

                      setLoadable(newPayments.length < count);
                      setPayments(newPayments);
                      setLoading(false)
                    })
                  }
                  else{
                    setLoading(false)
                  }
                })
                
                return true;
              }
              else{
                setSbMsg("Gagal membuat pembayaran");
                return false;
              }
            })
          }}
        />
      </Dialog>
      {/*Membuat pembayaran end*/}

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
  )
}