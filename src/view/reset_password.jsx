import { Box, Typography, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkResetPasswordToken, resetPassword } from "../request/user";
import { site } from "../setting";
import {Link} from "react-router-dom";
import { Helmet } from "react-helmet";
import FAlert from "../component/falert";
import Loading from "./loading";

export default function ResetPassword(){
  const {token} = useParams();

  const [loading, setLoading] = useState(true);

  const [errMsg, setErrMsg] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [passErr, setPassErr] = useState(null);

  const [rpassErr, setRpassErr] = useState(null);

  const [succAlert, setSuccAlert] = useState(null);

  const [errAlert, setErrAlert] = useState(null)

  const passRef = React.createRef();

  const rpassRef = React.createRef();

  useEffect(()=>{
    setLoading(true);

    checkResetPasswordToken(token).then(res => {
      if(res.status === 500){
        setErrMsg("ERROR 500: Terjadi masalah, mohon coba lagi nanti.")
      }

      else if(res.status === 401){
        setErrMsg("ERROR 401: Token kadaluarsa.")
      }

      else if(res.status === 404){
        setErrMsg("ERROR 404: Token tidak valid.")
      }

      setLoading(false);
    })
  }, [token])
  
  const onSubmit = ()=>{
    setSuccAlert(null);
    setErrAlert(null);
    setPassErr(null);
    setRpassErr(null);

    const pass = passRef.current.value;

    const rpass = rpassRef.current.value;

    if(pass.length < 8){
      setPassErr("Panjang password tidak boleh kurang dari 8 karakter")
    }

    else if(pass !== rpass){
      setPassErr("Harus sama");
      setRpassErr("Harus sama");
    }

    else{
      setSubmitLoading(true);

      resetPassword(token, pass).then(res => {
        if(res.status === 500){
          setErrAlert("Terjadi masalah, mohon coba lagin nanti.");
        }

        else if(res.status === 404){
          setErrAlert("Token tidak valid.")
        }

        else if(res.status === 401){
          setErrAlert("Token telah kadaluarsa.")
        }

        else{
          setSuccAlert(
            <React.Fragment>
              <Typography gutterBottom>
                Silakan login dengan password baru anda.
              </Typography>

              <Box display="flex">
                <Box margin="auto">
                  <Button color="primary" component={Link} to="/login">
                    LOGIN
                  </Button>
                </Box>
              </Box>
            </React.Fragment>
          )
        }

        setSubmitLoading(false)
      })
    }
  }

  if(loading){
    return(
      <Loading/>
    );
  }

  else if(errMsg){
    return (
      <Box display="flex" minHeight="100vh" width="100%">
        <Box margin="auto" p="10px">
          <Typography variant="h5" align="center" gutterBottom>
            {errMsg}
          </Typography>

          <Typography variant="h6" align="center" gutterBottom>
            <Link to="/">{site}</Link>
          </Typography>
        </Box>
      </Box>
    );
  }

  else{
    return (
      <React.Fragment>
      <Helmet>
        <title>Ganti Password SIPEMA</title>
      </Helmet>

      <Box display="flex" minHeight="100vh" width="100%">
        <Box margin="auto" p="10px" width="320px">
          <Typography align="center" variant="h5" gutterBottom>
            Ganti Password Akun SIPEMA
          </Typography>

          {succAlert ? (
            <Box my="20px">
              <FAlert severity="success" title="Berhasil Mengganti Password" body={succAlert} />
            </Box>
          ) : errAlert ? (
            <FAlert severity="error" title="Gagal Mengganti Password" body={errAlert} />
          ) : null}

          <Box my="20px">
            <TextField type="password" fullWidth label="Password Baru" placeholder={"Masukan password baru anda..."} error={passErr} helperText={passErr} inputRef={passRef} onKeyUp={event => {
              if(event.keyCode === 13){
                event.preventDefault();

                onSubmit();
              }
            }}/>
          </Box>

          <Box my="20px">
            <TextField type="password" fullWidth label="Ulangi Password" placeholder={"Ulangi password baru anda..."} error={rpassErr} helperText={rpassErr} inputRef={rpassRef} onKeyUp={event => {
              if(event.keyCode === 13){
                event.preventDefault();

                onSubmit();
              }
            }}/>
          </Box>

          <Box my="40px">
            <Button fullWidth variant="contained" color="primary" disabled={submitLoading} onClick={onSubmit}>
              {submitLoading ? "MENGGANTI PASSWORD..." : "GANTI PASSWORD"}
            </Button>
          </Box>
        </Box>
      </Box>
      </React.Fragment>
    );
  }
}