import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 16,
  },
  title: {
    marginBottom: "0.75rem",
  },
}));

const Announcement = (props) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h6" gutterBottom>
        Announcement
      </Typography>
      <Card className={classes.card} variant="outlined">
        <Typography variant="h6" gutterBottom>
          Pengumuman 1
        </Typography>
      </Card>
    </>
  );
};

export default Announcement;
