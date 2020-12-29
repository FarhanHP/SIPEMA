import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setLoginToken } from "../local_storage";
import { register } from "../request/user";
import { site } from "../setting";
import Loading from "./loading";

export default function RegisterConfirm() {
  const { token } = useParams();

  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    register(token).then(res => {
      if (res.status === 500) {
        setErrorMsg("ERROR 500: Terjadi masalah, mohon coba lagi nanti.");
        setLoading(false);
      } else if (res.status === 401) {
        setErrorMsg("ERROR 401: Token sudah kadaluarsa.");
        setLoading(false);
      } else if (res.status === 403) {
        setErrorMsg("ERROR 403: Token tidak berlaku.");
        setLoading(false);
      } else {
        res.json().then(data => {
          setLoginToken(data.token);

          window.location.href = "/";
        });
      }
    });
  }, [token]);

  if (loading) {
    return <Loading />;
  } else if (errorMsg) {
    return (
      <Box display="flex" minHeight="100vh" width="100%">
        <Box margin="auto">
          <Typography variant="h5" align="center" gutterBottom>
            {errorMsg}
          </Typography>

          <Typography variant="h6" align="center" gutterBottom>
            <a href={"/"}>{site}</a>
          </Typography>
        </Box>
      </Box>
    );
  } else {
    return <p>Success</p>;
  }
}
