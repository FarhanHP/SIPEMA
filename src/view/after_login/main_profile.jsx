import React, { useState } from "react";
import { TextField, Button, Snackbar, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../request/user";
import { getLoginToken } from "../../local_storage";
import { login } from "../../actions";

export default function MainProfile() {
  const loginUser = useSelector((state) => {
    return state.loginUser;
  });

  const dispatch = useDispatch();

  const fullname = loginUser.fullname;

  const email = loginUser.email;

  const [fullnameErr, setFullnameErr] = useState(null);

  const [loading, setLoading] = useState(false);

  const fullnameRef = React.createRef();

  const [sbMsg, setSbMsg] = useState(null);

  const handleSubmit = () => {
    const newFullname = fullnameRef.current.value;

    setFullnameErr(null);

    if (newFullname !== fullname) {
      if (newFullname.length <= 0) {
        setFullnameErr("Tidak boleh kosong.");
      } else {
        setLoading(true);

        setProfile(getLoginToken(), newFullname).then((res) => {
          if (res.ok) {
            loginUser.fullname = newFullname;

            dispatch(login(loginUser));

            setSbMsg("Berhasil mengedit profil anda.");
          } else {
            setSbMsg("Gagal mengedit profil anda.");
          }

          setLoading(false);
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Box mt="50px">
        <TextField
          fullWidth
          label="Nama Lengkap"
          placeholder="Masukan nama lengkap anda..."
          defaultValue={fullname}
          error={fullnameErr}
          helperText={fullnameErr}
          inputRef={fullnameRef}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              event.preventDefault();

              handleSubmit();
            }
          }}
        />
      </Box>

      <Box mt="30px" mb="50px">
        <TextField fullWidth label="Email" disabled value={email} />
      </Box>

      <Box display="flex" mb="30px" flexDirection="row-reverse">
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
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
        onClose={() => {
          setSbMsg(null);
        }}
      />
    </React.Fragment>
  );
}
