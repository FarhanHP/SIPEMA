import { Box, Button, Typography } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getLoginToken, deleteLoginToken } from "../../local_storage";
import { logout } from "../../request/user";

export default function NotApproved(){
  const token = getLoginToken();

  const loginUser = useSelector(state=>{
    return state.loginUser
  })

  const [loading, setLoading] = useState(false);

  return (
    <Box display="flex" minHeight="100vh" width="100%">
      <Box margin="auto" width="320px">
        <Typography gutterBottom align="center">
          Selamat datang di SIPEMA
        </Typography>

        <Box mb="30px"/>

        <Typography variant="h5" align="center" gutterBottom>
          {loginUser.fullname}
        </Typography>

        <Box mb="30px"/>

        <Typography gutterBottom align="center">
          Pendaftaran Anda belum disetujui, silakan hubungi guru anda.
        </Typography>

        <Box mb="40px"/>

        <Box my="40px" display="flex">
          <Box margin="auto">
            <Button color="primary" disabled={loading} onClick={()=>{
              setLoading(true)

              logout(token).then(res => {
                if(res.ok){
                  deleteLoginToken()

                  window.location.href="/login"
                }

                setLoading(false)
              })
            }}>
              {loading ? "LOGGING OUT..." : "LOG OUT"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}