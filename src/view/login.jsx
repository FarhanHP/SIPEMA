import { Box, Typography, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { isEmail } from "../utils";
import { login } from "../request/user";
import FAlert from "../component/falert";
import { setLoginToken } from "../local_storage";

export default function Login() {
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrMsg] = useState(null);

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const onSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setErrMsg(null);
    setEmailErr(null);
    setPasswordErr(null);

    if (email.length <= 0) {
      setEmailErr("Tidak boleh kosong");
    } else if (!isEmail(email)) {
      setEmailErr("Email tidak berlaku");
    } else if (password.length <= 0) {
      setPasswordErr("Tidak boleh kosong");
    } else {
      setLoading(true);

      login(email, password).then(res => {
        if (res.status === 500) {
          setErrMsg("Terjadi masalah, mohon coba lagi nanti.");
          setLoading(false);
        } else if (res.status >= 400) {
          setErrMsg("Email atau password salah.");
          setLoading(false);
        } else {
          res.json().then(data => {
            setLoginToken(data.token);
            window.location.href = "/";
          });
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Login SIPEMA</title>
      </Helmet>

      <Box display="flex" minHeight="100vh" width="100%">
        <Box margin="auto" width="320px" p="10px">
          <Typography variant="h5" align="center" gutterBottom>
            SIPEMA
          </Typography>

          <Typography align="center" gutterBottom>
            Sistem Informasi Pengajian Musholla Al-Ikhlas
          </Typography>

          {errorMsg ? (
            <Box my="20px">
              <FAlert severity={"error"} title={"Login Error"} body={errorMsg} />
            </Box>
          ) : null}

          <Box my="40px">
            <TextField
              fullWidth
              label="Email"
              placeholder="Masukan email anda..."
              inputRef={emailRef}
              error={emailErr}
              helperText={emailErr}
              onKeyUp={event => {
                if (event.keyCode === 13) {
                  event.preventDefault();

                  onSubmit();
                }
              }}
            />
          </Box>

          <Box my="40px">
            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Masukan password anda..."
              inputRef={passwordRef}
              error={passwordErr}
              helperText={passwordErr}
              onKeyUp={event => {
                if (event.keyCode === 13) {
                  event.preventDefault();

                  onSubmit();
                }
              }}
            />
          </Box>

          <Box my="20px">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? "MENCOBA MASUK..." : "MASUK"}
            </Button>
          </Box>

          <Typography gutterBottom variant="body1" align="center">
            <Link to="/password/reset">Lupa Password</Link>
          </Typography>

          <Typography gutterBottom variant="body1" align="center">
            Belum punya akun ? <Link to="/register">Daftar</Link>
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}
