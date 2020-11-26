import {Alert, AlertTitle} from "@material-ui/lab";

export default function FAlert(props){
  const severity = props.severity;

  const title = props.title;

  const body = props.body;

  return(
    <Alert severity={severity}>
      <AlertTitle>
        {title}
      </AlertTitle>

      {body}
    </Alert>
  );
}