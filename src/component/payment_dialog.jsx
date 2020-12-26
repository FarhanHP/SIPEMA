import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import { createRef, Fragment, useState } from "react";
import moment from "moment";

export default function PaymentDialog(props){
  const headerTitle = props.headerTitle;
  const defaultAmount = props.defaultAmount;
  const defaultDate = props.defaultDate;
  const onSubmit = props.onSubmit;
  const btnTitle = props.btnTitle;
  
  const amountRef = createRef();
  const dateRef = createRef();

  const [amountErr, setAmountErr] = useState(null);
  const [dateErr, setDateErr] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const amount = amountRef.current.value;
    const date = dateRef.current.value;

    setAmountErr(null);
    setDateErr(null);

    if(amount.length <= 0){
      setAmountErr("Tidak boleh kosong");
    }

    else if(Number(amount) <= 0){
      setAmountErr("Tidak boleh di bawah 0");
    }

    else if(date.length <= 0){
      setDateErr("Tidak boleh kosong")
    }

    else{
      setLoading(true);
      const unixDate = moment(date).unix()

      onSubmit(amount, unixDate).then(res => {
        if(!res){
          setLoading(false)
        }
      })
    }

  }

  return (
    <Fragment>
      <DialogTitle>
        {headerTitle}
      </DialogTitle>

      <DialogContent>
        <TextField
          inputRef={amountRef}
          error={amountErr}
          helperText={amountErr}
          label="Nominal"
          placeholder="Masukan nominal..."
          defaultValue={defaultAmount}
          type="number"
          fullWidth
          onKeyUp={event => {
            if(event.keyCode === 13){
              event.preventDefault();

              handleSubmit();
            }
          }}
        />

        <Box my="40px"/>

        <Typography gutterBottom>
          Tanggal Pembayaran: 
        </Typography>

        <TextField
          inputRef={dateRef}
          error={dateErr}
          helperText={dateErr}
          defaultValue={moment.unix(defaultDate).format("YYYY-MM-DD")}
          type="date"
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? btnTitle.loading : btnTitle.normal}
        </Button>
      </DialogActions>
    </Fragment>
  );
}