import React, { useState } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { isEmail } from "../utils";
import { resetPasswordRequest } from "../request/user";
import FAlert from "../component/falert";

export default function ForgetPassword() {
  const [emailErr, setEmailErr] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errMsg, setErrMsg] = useState(null);

  const [succMsg, setSuccMsg] = useState(null);

  const emailRef = React.createRef();

  const onSubmit = () => {
    setEmailErr(null);
    setErrMsg(null);
    setSuccMsg(null);

    const email = emailRef.current.value;

    if (email.length <= 0) {
      setEmailErr("Tidak boleh kosong");
    } else if (!isEmail(email)) {
      setEmailErr("Email tidak berlaku");
    } else {
      setLoading(true);

      resetPasswordRequest(email).then(res => {
        if (res.status === 500) {
          setErrMsg("Terjadi masalah, mohon coba lagi nanti.");
        } else if (res.status === 404) {
          setErrMsg("Email tidak terdaftar.");
        } else {
          setSuccMsg("Silakan cek email anda. Jika tidak ada, coba cek folder spam.");
        }

        setLoading(false);
      });
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Lupa Password SIPEMA</title>
      </Helmet>

      <Box display="flex" minHeight="100vh" width="100%" flexDirection="column">
        <Box
          p={{
            xs: "0",
            sm: "10px",
          }}
        >
          <IconButton component={Link} to="/login">
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Box margin="auto" width="320px" p="10px">
          <Typography variant="h5" align="center" gutterBottom>
            Lupa Password Akun SIPEMA
          </Typography>

          <Typography align="center" gutterBottom>
            Anda akan dikirimi email yang berisi tautan untuk mengganti password anda.
          </Typography>

          {succMsg ? (
            <Box my="20px">
              <FAlert
                severity={"success"}
                title="Permintaan reset password berhasil"
                body={succMsg}
              />
            </Box>
          ) : errMsg ? (
            <Box my="20px">
              <FAlert severity={"error"} title="Permintaan reset password gagal" body={errMsg} />
            </Box>
          ) : null}

          <Box my="40px">
            <TextField
              label="Email"
              placeholder="Masukan email anda..."
              fullWidth
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

          <Box display="flex" flexDirection={"row-reverse"}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? "MERESET PASSWORD..." : "RESET PASSWORD"}
            </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
