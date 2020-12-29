import { Grid, TextField } from "@material-ui/core";

export default function IqraForm(props) {
  const halAwalDefaultValue = props.halAwalDefaultValue;
  const halAkhirDefaultValue = props.halAkhirDefaultValue;

  const halAwalRef = props.halAwalRef;
  const halAkhirRef = props.halAkhirRef;

  const halAwalErr = props.halAwalErr;
  const halAkhirErr = props.halAkhirErr;

  const disabled = props.disabled;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Halaman Awal"
          error={halAwalErr}
          helperText={halAwalErr}
          inputRef={halAwalRef}
          defaultValue={halAwalDefaultValue ? halAwalDefaultValue : 0}
          type="number"
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Halaman Akhir"
          error={halAkhirErr}
          helperText={halAkhirErr}
          inputRef={halAkhirRef}
          defaultValue={halAkhirDefaultValue ? halAkhirDefaultValue : 0}
          type="number"
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}
