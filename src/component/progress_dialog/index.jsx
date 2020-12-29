import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { createRef, Fragment, useState } from "react";
import { type as typeEnum } from "../../enums/progress";
import IqraForm from "./iqra_form";
import moment from "moment";
import QuranForm from "./quran_form";

export default function ProgressDialog(props) {
  const headerTitle = props.headerTitle;
  const btnTitle = props.btnTitle;
  const onSubmit = props.onSubmit;

  const defaultType = props.defaultType;
  const defaultHalAwal = props.defaultHalAwal;
  const defaultHalAkhir = props.defaultHalAkhir;
  const defaultSuratAwal = props.defaultSuratAwal;
  const defaultSuratAkhir = props.defaultSuratAkhir;
  const defaultAyatAwal = props.defaultAyatAwal;
  const defaultAyatAkhir = props.defaultAyatAkhir;
  const defaultComment = props.defaultComment;
  const defaultTanggal = props.defaultTanggal;

  const halAwalRef = createRef();
  const halAkhirRef = createRef();
  const suratAwalRef = createRef();
  const suratAkhirRef = createRef();
  const ayatAwalRef = createRef();
  const ayatAkhirRef = createRef();
  const commentRef = createRef();
  const tanggalRef = createRef();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(defaultType ? defaultType : typeEnum.IQRA);
  const [halAwalErr, setHalAwalErr] = useState(null);
  const [halAkhirErr, setHalAkhirErr] = useState(null);
  const [suratAwalErr, setSuratAwallErr] = useState(null);
  const [suratAkhirErr, setSuratAkhirErr] = useState(null);
  const [ayatAwalErr, setAyatAwalErr] = useState(null);
  const [ayatAkhirErr, setAyatAkhirErr] = useState(null);
  const [tanggalErr, setTanggalErr] = useState(null);

  const handleSubmit = () => {
    setHalAwalErr(null);
    setHalAkhirErr(null);
    setSuratAwallErr(null);
    setSuratAkhirErr(null);
    setAyatAwalErr(null);
    setAyatAkhirErr(null);
    setTanggalErr(null);

    let halAwal = undefined;
    let halAkhir = undefined;
    let suratAwal = undefined;
    let suratAkhir = undefined;
    let ayatAwal = undefined;
    let ayatAkhir = undefined;
    const comment = commentRef.current.value;
    const tanggal = tanggalRef.current.value;

    let isError = false;

    if (type === typeEnum.IQRA) {
      halAwal = halAwalRef.current.value;
      halAkhir = halAkhirRef.current.value;
      const halAwalNumber = Number(halAwal);
      const halAkhirNumber = Number(halAkhir);

      if (halAwal.length <= 0) {
        setHalAwalErr("Tidak boleh kosong");
        isError = true;
      }

      if (halAkhir.length <= 0) {
        setHalAkhirErr("Tidak boleh kosong");
        isError = true;
      }

      if (halAwalNumber < 0) {
        setHalAwalErr("Tidak boleh negatif");
        isError = true;
      }

      if (halAkhirNumber < 0) {
        setHalAkhirErr("Tidak boleh negatif");
        isError = true;
      }

      if (halAwalNumber > halAkhirNumber) {
        setHalAwalErr("Tidak boleh lebih besar daripada halaman akhir");
        setHalAkhirErr("Tidak boleh lebih kecil daripada halaman awal");
        isError = true;
      }
    } else {
      suratAwal = suratAwalRef.current.value;
      suratAkhir = suratAkhirRef.current.value;
      ayatAwal = ayatAwalRef.current.value;
      ayatAkhir = ayatAkhirRef.current.value;
      const ayatAwalNumber = Number(ayatAwal);
      const ayatAkhirNumber = Number(ayatAkhir);

      if (ayatAwal.length <= 0) {
        setAyatAwalErr("Tidak boleh kosong");
        isError = true;
      }

      if (ayatAkhir.length <= 0) {
        setAyatAkhirErr("Tidak boleh kosong");
        isError = true;
      }

      if (suratAwal.length <= 0) {
        setSuratAwallErr("Tidak boleh kosong");
        isError = true;
      }

      if (suratAkhir.length <= 0) {
        setSuratAkhirErr("Tidak boleh kosong");
        isError = true;
      }

      if (ayatAwalNumber < 0) {
        setAyatAwalErr("Tidak boleh negatif");
        isError = true;
      }

      if (ayatAkhirNumber < 0) {
        setAyatAkhirErr("Tidak boleh negatif");
        isError = true;
      }
    }

    if (tanggal.length <= 0) {
      setTanggalErr("Tidak boleh kosong");
      isError = true;
    }

    if (!isError) {
      const tanggalUnix = moment(tanggal).unix();
      setLoading(true);

      onSubmit(
        type,
        halAwal,
        halAkhir,
        suratAwal,
        suratAkhir,
        ayatAwal,
        ayatAkhir,
        comment,
        tanggalUnix,
      ).then(res => {
        if (!res) {
          setLoading(false);
        }
      });
    }
  };

  return (
    <Fragment>
      <DialogTitle>{headerTitle}</DialogTitle>

      <DialogContent>
        <Box
          mb="20px"
          width={{
            xs: "100%",
            sm: "50%",
          }}
        >
          <InputLabel id="type">Tipe</InputLabel>

          <Select
            value={type}
            onChange={event => {
              setType(event.target.value);
            }}
            fullWidth
            id="type"
            disabled={loading}
          >
            <MenuItem value={typeEnum.IQRA}>Iqra</MenuItem>

            <MenuItem value={typeEnum.QURAN}>Quran</MenuItem>
          </Select>
        </Box>

        {type === typeEnum.IQRA ? (
          <IqraForm
            halAwalDefaultValue={defaultHalAwal}
            halAkhirDefaultValue={defaultHalAkhir}
            halAwalRef={halAwalRef}
            halAkhirRef={halAkhirRef}
            halAwalErr={halAwalErr}
            halAkhirErr={halAkhirErr}
            disabled={loading}
          />
        ) : type === typeEnum.QURAN ? (
          <QuranForm
            disabled={loading}
            defaultSuratAwal={defaultSuratAwal}
            defaultSuratAkhir={defaultSuratAkhir}
            defaultAyatAwal={defaultAyatAwal}
            defaultAyatAkhir={defaultAyatAkhir}
            suratAwalErr={suratAwalErr}
            suratAkhirErr={suratAkhirErr}
            ayatAwalErr={ayatAwalErr}
            ayatAkhirErr={ayatAkhirErr}
            suratAwalRef={suratAwalRef}
            suratAkhirRef={suratAkhirRef}
            ayatAwalRef={ayatAwalRef}
            ayatAkhirRef={ayatAkhirRef}
          />
        ) : null}

        <Box my="20px">
          <TextField
            inputRef={commentRef}
            defaultValue={defaultComment}
            label="Komentar"
            placeholder="Beri komentar atas bacaan murid anda..."
            fullWidth
            multiline
            disabled={loading}
          />
        </Box>

        <Box my="20px">
          <InputLabel id="type">Tanggal Baca</InputLabel>

          <TextField
            inputRef={tanggalRef}
            defaultValue={moment.unix(defaultTanggal).format("YYYY-MM-DD")}
            error={tanggalErr}
            helperText={tanggalErr}
            fullWidth
            type="date"
            id="tanggal"
            disabled={loading}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="primary" disabled={loading} onClick={handleSubmit}>
          {loading ? btnTitle.loading : btnTitle.normal}
        </Button>
      </DialogActions>
    </Fragment>
  );
}
