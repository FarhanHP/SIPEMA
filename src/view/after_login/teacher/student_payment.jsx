import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AttachMoney as MoneyIcon } from "@material-ui/icons";
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";
import { Box, Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { getAllPayment, getPaymentTotal } from "../../../request/payment";
import { getLoginToken } from "../../../local_storage";
import { Skeleton } from "@material-ui/lab";
import { renderPrice } from "../../../utils";
import moment from "moment";

const useStyles = makeStyles(()=>{
  return {
    paymentSum: {
      backgroundColor: blueGrey[100]
    }
  }
})

export default function StudentPayment() {
  const classes = useStyles();

  const limit = 5;

  const [totalLoading, setTotalLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  const [total, setTotal] = useState(0);
  const [payments, setPayments] = useState([]);

  const [loadable, setLoadable] = useState(false);

  const loadingElement = [];
  for(let i=0; i<limit; i++){
    loadingElement.push(
      <Box mb="20px">
        <Skeleton variant="rect" height="75px" width="100%"/>
      </Box>
    );
  }

  useEffect(()=>{
    getPaymentTotal(getLoginToken()).then(res => {
      if(res.ok){
        res.json().then(data => {
          setTotal(data.amount);

          setTotalLoading(false);
        })
      }

      else{
        setTotalLoading(false)
      }
    })
  
    getAllPayment(getLoginToken(), 0, limit).then(res => {
      if(res.ok){
        res.json().then(data => {
          const newPayments = data.payments;
          const count = data.count;

          setLoadable(newPayments.length < count);

          setPayments(newPayments);

          setPaymentsLoading(false);
        })
      }

      else{
        setPaymentsLoading(false)
      }
    })
  }, [])

  const loginUser = useSelector((state) => {
    return state.loginUser;
  });

  return (
    <React.Fragment>
      <Main loginUser={loginUser}>
        <HeaderTitle
          icon={<MoneyIcon fontSize="large" />}
          title="Riwayat Pembayaran Murid"
        />

        <Box mt="20px" mb="50px">
          <Grid container direction="row-reverse" spacing={2}>
            <Grid item xs={12} lg={4}>
              <Box component={Paper} width="100%" height="150px" elevation={3} className={classes.paymentSum} p="20px">
                <Typography variant="h6" gutterButtom>
                  Total: 
                </Typography>

                <Typography variant="h6">
                  {totalLoading ? "Menghitung..." : `Rp${renderPrice(total)}`}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} lg={8}>
              {payments.map((value) => {
                const student = value.student;
                const fullname = student.fullname;

                const _id = value._id;
                const amount = value.amount;
                const created = value.created;

                return (
                  <Box key={_id} component={Paper} elevation={3} p="15px" mb="20px">
                    <Typography gutterBottom>
                      <b>{fullname}</b>&nbsp;Rp{renderPrice(amount)}
                    </Typography>

                    <Typography gutterBottom>
                      {moment.unix(created).format("llll")}
                    </Typography>
                  </Box>
                );
              })}

              {paymentsLoading ? loadingElement : loadable ? (
                <Box 
                  display="flex" 
                  justifyContent="center"
                  onClick={()=>{
                    setPaymentsLoading(true);

                    getAllPayment(getLoginToken(), payments.length, limit).then(res=>{
                      if(res.ok){
                        res.json().then(data => {
                          const newPayments = payments.concat(data.payments);

                          const count = data.count;

                          setLoadable(count > newPayments.length);

                          setPayments(newPayments);

                          setPaymentsLoading(false);
                        })
                      }

                      else{
                        setPaymentsLoading(false);
                      }
                    })
                  }}
                >
                  <Button color="primary">Muat Lebih Banyak</Button>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Main>
    </React.Fragment>
  );
}
