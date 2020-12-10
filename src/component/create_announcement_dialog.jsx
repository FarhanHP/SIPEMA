import { createRef, useState, Fragment } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core"

export default function CreateAnnouncementDialog(props){
  const titleRef =  createRef();
  const descRef = createRef();

  const [titleErr, setTitleErr] = useState(null);
  const [descErr, setDescErr] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = ()=>{
    setTitleErr(null);

    setDescErr(null);

    const title = titleRef.current.value;
    const desc = descRef.current.value;

    if(title.length <= 0){
      setTitleErr("Tidak boleh kosong")
    }

    else if(desc.length <= 0){
      setDescErr("Tidak boleh kosong")
    }

    else{
      setLoading(true);

      const res = props.handleSubmit(title, desc);

      res.then(value => {
        if(!value){
          setLoading(false)
        }
      })
    }
  }

  return (
    <Fragment>
      <DialogTitle>
        Membuat Pengumuman
      </DialogTitle>

      <DialogContent>
        <TextField
          inputRef={titleRef}
          error={titleErr}
          helperText={titleErr}
          label="Judul"
          placeholder="Masukan judul pengumuman..."
        />

        <TextField
          inputRef={descRef}
          error={descErr}
          helperText={descErr}
          label="Isi Pengumuman"
          placeholder="Masukan isi pengumuman..."
          multiline
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" disabled={loading} onClick={handleSubmit}>
          {loading ? "MEMBUAT..." : "BUAT"}
        </Button>
      </DialogActions>
    </Fragment>
  );
}