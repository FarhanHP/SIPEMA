import React, { useState, createRef } from "react";
import { getLoginToken } from "../local_storage";
import { changePass } from "../request/user";
import {Box, TextField, Button, Snackbar} from "@material-ui/core";

export default function ChangePassword(){
  const [passErr, setPassErr] = useState(null);

  const [npassErr, setNpassErr] = useState(null);

  const [rnpassErr, setRnpassErr] = useState(null);

  const [loading, setLoading] = useState(false);

  const [sbMsg, setSbMsg] = useState(null);

  const passRef = createRef();

  const npassRef = createRef();

  const rnpassRef = createRef();

  const handleSubmit = ()=>{
    setPassErr(null);
    setRnpassErr(null);
    setNpassErr(null);
    setSbMsg(null);

    const pass = passRef.current.value;

    const npass = npassRef.current.value;

    const rnpass = rnpassRef.current.value;

    if(pass.length <= 0){
      setPassErr("Tidak boleh kosong.");
    }

    else if(npass.length < 8){
      setNpassErr("Panjang minimal 8 karakter.")
    }

    else if(npass !== rnpass){
      setNpassErr("Harus sama.");
      setRnpassErr("Harus sama.")
    }

    else{
      setLoading(true);

      changePass(getLoginToken(), pass, npass).then(res => {
        if(res.ok){
          setSbMsg("Berhasil mengganti password.");
        }

        else if(res.status === 401){
          setSbMsg("Password/token tidak valid.")
        }

        else if(res.status === 500){
          setSbMsg("Terjadi masalah, mohon coba lagi nanti.")
        }
        
        setLoading(false);
      })
    }
  }

  return (
    <React.Fragment>
      <Box mt="50px">
        <TextField 
          fullWidth 
          label="Password Lama" 
          placeholder="Masukan password lama anda..." 
          type="password"
          error={passErr}
          helperText={passErr}
          inputRef={passRef}
          onKeyUp={event => {
            if(event.keyCode === 13){
              event.preventDefault();

              handleSubmit();
            }
          }} 
        />
      </Box>

      <Box mt="30px" mb="50px">
        <TextField 
          fullWidth 
          label="Password Baru"
          placeholder="Masukan password baru anda..." 
          type="password"
          inputRef={npassRef}
          error={npassErr}
          helperText={npassErr}
          onKeyUp={event => {
            if(event.keyCode === 13){
              event.preventDefault();

              handleSubmit();
            }
          }} 
        />
      </Box>

      <Box mt="30px" mb="50px">
        <TextField 
          fullWidth 
          label="Ulangi Password Baru"
          placeholder="Masukan ulang password baru anda..." 
          type="password"
          inputRef={rnpassRef}
          error={rnpassErr}
          helperText={rnpassErr}
          onKeyUp={event => {
            if(event.keyCode === 13){
              event.preventDefault();

              handleSubmit();
            }
          }} 
        />
      </Box>

      <Box display="flex" mb="30px" flexDirection="row-reverse" >
        <Button color="primary" variant="contained" disabled={loading} onClick={handleSubmit} >
          {loading ? "MENGUBAH..." : "UBAH"}
        </Button>
      </Box>

      <Snackbar 
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        message={sbMsg}
        open={sbMsg}
        key={sbMsg}
        autoHideDuration={6000}
        onClose={()=>{
          setSbMsg(null)
        }}
      />
    </React.Fragment>
  );
}