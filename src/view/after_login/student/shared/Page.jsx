import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  page: {
    padding: "28px 12px",
  },
}));

const Page = props => {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.page}>{children}</div>;
};

export default Page;
