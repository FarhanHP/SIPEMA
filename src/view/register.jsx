import {Box, Typography, TextField, Button} from "@material-ui/core";
import { Helmet } from "react-helmet";
import React, {useState} from "react"
import { Link } from "react-router-dom";
import {isEmail} from "../utils";
import {registerRequest} from "../request/user";
import FAlert from "../component/falert";

export default function Register(){
  const [emailErr, setEmailErr] = useState(null);

  const [fullnameErr, setFullnameErr] = useState(null);

  const [passwordErr, setPasswordErr] = useState(null);

  const [rpasswordErr, setRpasswordErr] = useState(null);

  const [loading, setLoading] = useState(false);

  const [successMsg, setSuccessMsg] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null)

  const emailRef = React.createRef();

  const fullnameRef = React.createRef();

  const passwordRef = React.createRef();

  const rpasswordRef = React.createRef();

  const onSubmit = ()=>{
    const email = emailRef.current.value;
    const fullname = fullnameRef.current.value;
    const password = passwordRef.current.value;
    const rpassword = rpasswordRef.current.value;

    setEmailErr(null);
    setFullnameErr(null);
    setPasswordErr(null);
    setRpasswordErr(null);
    setSuccessMsg(null);
    setErrorMsg(null);

    if(email.length <= 0){
      setEmailErr("Tidak boleh kosong")
    }

    else if(!isEmail(email)){
      setEmailErr("Email tidak berlaku")
    }

    else if(fullname.length <= 0){
      setFullnameErr("Tidak boleh kosong")
    }

    else if(password.length < 8){
      setPasswordErr("Password tidak boleh kurang dari 8 karakter")
    }

    else if(password !== rpassword){
      setRpasswordErr("Harus sama")
      setPasswordErr("Harus sama")
    }

    else{
      setLoading(true);

      registerRequest(email, fullname, password).then(res => {
        if(res.status === 500){
          setErrorMsg("Terjadi masalah, mohon coba lagi nanti.")
        }

        else if(res.status === 409){
          setEmailErr("Email sudah dipakai")
        }

        else {
          setSuccessMsg("Silakan cek email anda untuk verifikasi")
        }

        setLoading(false)
      })
    }
  }

  return (
    <React.Fragment>
    <Helmet>
      <title>
        Daftar SIPEMA
      </title>
    </Helmet>

    <Box display="flex" minHeight="100vh" width="100%">
      <Box margin="auto" width="320px" p="10px">
        <Typography variant="h5" align="center" gutterBottom>
          SIPEMA
        </Typography>

        <Typography align="center" gutterBottom>
          Sistem Informasi Pengajian Musholla Al-Ikhlas
        </Typography>

        {successMsg ? (
          <Box my="20px">
            <FAlert severity="success" title="Berhasil Mendaftar" body={successMsg}/>
          </Box>
        ) : errorMsg ? (
          <Box my="20px">
            <FAlert severity="error" title="Gagal Mendaftar" body={errorMsg}/>
          </Box>
        ) : null}

        <Box my="20px">
          <TextField label="Email" placeholder="Masukan email anda..." fullWidth inputRef={emailRef} error={emailErr} helperText={emailErr} onKeyUp={(event)=>{
            if(event.keyCode === 13){
              event.preventDefault();

              onSubmit();
            }
          }}/>
        </Box>

        <Box my="20px">
          <TextField label="Nama lengkap" placeholder="Masukan nama lengkap anda..." fullWidth inputRef={fullnameRef} error={fullnameErr} helperText={fullnameErr} onKeyUp={(event)=>{
            if(event.keyCode === 13){
              event.preventDefault();

              onSubmit();
            }
          }}/>
        </Box>

        <Box my="20px">
          <TextField label="Password" type="password" placeholder="Masukan password anda..." fullWidth inputRef={passwordRef} error={passwordErr} helperText={passwordErr} onKeyUp={(event)=>{
            if(event.keyCode === 13){
              event.preventDefault();

              onSubmit();
            }
          }}/>
        </Box>

        <Box my="20px">
          <TextField label="Ulangi password" placeholder="Ulangi password anda..." fullWidth inputRef={rpasswordRef} error={rpasswordErr} type="password" helperText={rpasswordErr} onKeyUp={(event)=>{
            if(event.keyCode === 13){
              event.preventDefault();

              onSubmit();
            }
          }}/>
        </Box>

        <Box mt="40px">
          <Button variant="contained" color="primary" fullWidth disabled={loading} onClick={onSubmit}>
            {loading ? "MENDAFTAR..." : "DAFTAR"}
          </Button>
        </Box>

        <Box my="20px">
          <Typography align="center">
            Sudah punya akun ? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
    </React.Fragment>
  );
}