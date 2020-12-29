import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardActions from "@material-ui/core/CardActions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { login } from "../../../actions";

import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

const useProfileSettingStyles = makeStyles(theme => {
  console.log(theme);
  return {
    inputFile: {
      display: "none",
    },
    header: {
      backgroundColor: theme.palette.grey[100],
    },
    form: {
      // padding: "20px 20px",
      "& .MuiTextField-root": {
        marginTop: theme.spacing(3),
      },
    },
    mlAuto: {
      marginLeft: "auto",
    },
    avatarWrapper: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      marginTop: theme.spacing(4),
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  };
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ChangeProfileForm = props => {
  const classes = useProfileSettingStyles();
  const user = useSelector(state => state.loginUser);
  const [snackbar, setSnackbar] = useState(false);
  const { register, handleSubmit, errors, getValues } = useForm();
  const dispatch = useDispatch();
  const mutation = useMutation(
    formData => {
      return fetch("https://sipema.herokuapp.com/b/user/profile/set", {
        method: "PUT",
        headers: {
          token: window.localStorage.getItem("login_token"),
          "Content-Type": "application/json",
        },
        //  formData = {
        // fullname: 'xxxx'
        // }
        body: JSON.stringify(formData),
      });
    },
    {
      onSuccess: res => {
        if (res.ok) {
          let updatedUser = { ...user, fullname: getValues("fullname") };
          dispatch(login(updatedUser));
          setSnackbar({ type: "success", message: "Sukses mengubah profil" });
        } else {
          setSnackbar({ type: "error", message: "Ada masalah!" });
        }
      },
    },
  );

  const onSubmit = data => {
    mutation.mutate(data);
  };

  const handleClose = () => setSnackbar(null);

  return (
    <>
      {snackbar && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert onClose={handleClose} severity={snackbar.type}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className={classes.form}>
          <TextField
            error={errors.fullname}
            helperText={errors.fullname?.message}
            defaultValue={user?.fullname}
            fullWidth
            name="fullname"
            label="fullname"
            inputRef={register({ required: "Nama tidak boleh kosong" })}
          />
          <TextField defaultValue={user?.email} fullWidth disabled name="email" label="Disabled" />
        </CardContent>
        <CardActions disableSpacing>
          <Button
            className={classes.mlAuto}
            variant="contained"
            color="primary"
            disabled={mutation.isLoading}
            disableElevation
            type="submit"
          >
            {mutation.isLoading ? "Mengupdate data..." : "Update Profile"}
          </Button>
        </CardActions>
      </form>
    </>
  );
};

const ChangePasswordForm = props => {
  const classes = useProfileSettingStyles();
  const [snackbar, setSnackbar] = useState(false);
  // const user = useSelector(state => state.loginUser);
  const { register, handleSubmit, errors, getValues } = useForm();
  const mutation = useMutation(
    formData => {
      return fetch("https://sipema.herokuapp.com/b/user/password/set", {
        method: "PUT",
        headers: {
          token: window.localStorage.getItem("login_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },
    {
      onSuccess: res => {
        if (res.ok) {
          setSnackbar({ type: "success", message: "Sukses mengubah profil" });
        } else {
          setSnackbar({ type: "error", message: "Ada masalah!" });
        }
      },
    },
  );

  const onSubmit = data => {
    mutation.mutate({ old_password: data.oldPassword, new_password: data.newPassword });
  };

  const handleClose = () => setSnackbar(null);

  return (
    <>
      {snackbar && (
        <Snackbar
          open={snackbar}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <MuiAlert onClose={handleClose} severity={snackbar.type}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className={classes.form}>
          <TextField
            fullWidth
            name="oldPassword"
            label="Password Lama"
            inputRef={register}
            type="password"
          />
          <TextField
            error={errors.newPassword}
            helperText={errors.newPassword?.message}
            type="password"
            fullWidth
            name="newPassword"
            label="Password Baru"
            inputRef={register({
              validate: {
                moreThanEight: value => {
                  return value.length > 8 || "Password baru harus lebih dari 8!";
                },
              },
            })}
          />
          <TextField
            fullWidth
            name="newPasswordRepeat"
            label="Ulangi Password Baru"
            type="password"
            error={errors.newPasswordRepeat}
            helperText={errors.newPasswordRepeat?.message}
            inputRef={register({
              validate: {
                samePassword: value => {
                  const newPassword = getValues("newPassword");
                  return newPassword === value || "Password tidak sama!";
                },
              },
            })}
          />
        </CardContent>
        <CardActions disableSpacing>
          <Button
            className={classes.mlAuto}
            variant="contained"
            color="primary"
            disableElevation
            disabled={mutation.isLoading}
            type="submit"
          >
            {mutation.isLoading ? "Mengupdate password..." : "Update Password"}
          </Button>
        </CardActions>
      </form>
    </>
  );
};

const ProfileSetting = props => {
  const classes = useProfileSettingStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <div className={classes.header}>
        <Typography variant="h6" style={{ padding: "40px 20px" }}>
          Profile Setting
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Umum" />
          <Tab label="Ganti Password" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <ChangeProfileForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePasswordForm />
      </TabPanel>
    </Card>
  );
};

const AvatarPlaceholder = () => {
  const classes = useProfileSettingStyles();
  return (
    <Box
      className={classes.avatar}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={999}
    >
      <CircularProgress />
    </Box>
  );
};

const ChangeProfilePicture = props => {
  const classes = useProfileSettingStyles();
  const user = useSelector(state => state.loginUser);
  const dispatch = useDispatch();

  const mutation = useMutation(
    formData => {
      console.log(formData.get("photo"));
      return fetch("https://sipema.herokuapp.com/b/user/profile/picture/set", {
        method: "PUT",
        headers: {
          token: window.localStorage.getItem("login_token"),
        },
        body: formData,
      });
    },
    {
      onSuccess: res => {
        if (res.ok) {
          res.json().then(data => {
            let updatedUser = { ...user, pp: data.pp };
            dispatch(login(updatedUser));
          });
        }
      },
    },
  );

  const onChange = e => {
    const form = new FormData();
    const fileSize = e.target.files[0].size / 1024 / 1024;
    form.append("photo", e.target.files[0]);
    if (fileSize < 10) mutation.mutate(form);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {user.fullname}
        </Typography>
        <Typography align="center" color="textPrimary">
          {user.role}
        </Typography>
        <div className={classes.avatarWrapper}>
          {mutation.isLoading ? (
            <AvatarPlaceholder />
          ) : (
            <Avatar className={classes.avatar} src={user.pp} />
          )}

          <Box mt="20px">
            <input
              accept="image/*"
              className={classes.inputFile}
              id="contained-button-file"
              type="file"
              onChange={onChange}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                disableElevation
                component="span"
                className={classes.mt4}
              >
                Ganti Foto Profil
              </Button>
            </label>
            <Typography align="center" variant="body2">
              Maksimum 10Mb
            </Typography>
          </Box>
        </div>

        <Box mt="20px">
          <Typography>
            Bergabung pada: <b>{moment.unix(user.created).format("llll")}</b>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Profile = props => {
  return (
    <Grid container spacing={4}>
      <Grid item md={8} xs={12}>
        <ProfileSetting />
      </Grid>
      <Grid item md={4} xs={12}>
        <ChangeProfilePicture />
      </Grid>
    </Grid>
  );
};

export default Profile;
