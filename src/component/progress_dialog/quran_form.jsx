import { Box, Grid, TextField } from "@material-ui/core";
import { Fragment } from "react";
import TextDivider from "../text_divider";

export default function QuranForm(props){
  const disabled = props.disabled;
  const defaultSuratAwal = props.defaultSuratAwal;
  const defaultSuratAkhir = props.defaultSuratAkhir;
  const defaultAyatAwal = props.defaultAyatAwal;
  const defaultAyatAkhir = props.defaultAyatAkhir;

  const suratAwalErr = props.suratAwalErr;
  const suratAkhirErr = props.suratAwalErr;
  const ayatAwalErr = props.ayatAwalErr;
  const ayatAkhirErr = props.ayatAkhirErr;

  const suratAwalRef = props.suratAwalRef;
  const suratAkhirRef = props.suratAkhirRef;
  const ayatAwalRef = props.ayatAwalRef;
  const ayatAkhirRef = props.ayatAkhirRef;

  return (
    <Fragment>
      <Box my="20px">
        <TextDivider text="Awal"/>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Surat" 
            placeholder="Masukan surat awal..."
            inputRef={suratAwalRef}
            error={suratAwalErr}
            helperText={suratAwalErr}
            disabled={disabled}
            defaultValue={defaultSuratAwal}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField 
            label="Ayat" 
            placeholder="Masukan ayat awal..."
            inputRef={ayatAwalRef}
            error={ayatAwalErr}
            helperText={ayatAwalErr}
            disabled={disabled}
            defaultValue={defaultAyatAwal ? defaultAyatAwal : 0}
            fullWidth
          />
        </Grid>
      </Grid>

      <Box my="20px">
        <TextDivider text="Akhir"/>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Surat" 
            placeholder="Masukan surat akhir..."
            inputRef={suratAkhirRef}
            error={suratAkhirErr}
            helperText={suratAkhirErr}
            disabled={disabled}
            defaultValue={defaultSuratAkhir}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField 
            label="Ayat" 
            placeholder="Masukan ayat akhir..."
            inputRef={ayatAkhirRef}
            error={ayatAkhirErr}
            helperText={ayatAkhirErr}
            disabled={disabled}
            defaultValue={defaultAyatAkhir ? defaultAyatAkhir : 0}
            fullWidth
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}