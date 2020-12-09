import {useState} from "react";
import {Box, Paper, Avatar, makeStyles, Typography, Button} from "@material-ui/core";

const useStyles = makeStyles((theme)=>{
  return {
    avatar: {
      height: theme.spacing(8),
      width: theme.spacing(8),
      fontSize: "50px"
    },
    
    greyColor: {
      color: "grey"
    }
  }
})

export default function UstudentCard(props){
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  
  const student = props.student;
  const pp = student.user.pp;
  const fullname = student.user.fullname;


  const onClick = ()=>{
    setLoading(true)

    const res = props.onAcc();

    res.then(value => {
      if(!value){
        setLoading(false);
      }
    })
  }

  return (
    <Box component={Paper} elevation={3} p="10px" my="10px" display="flex" width={{
      xs: "100%",
      sm: "500px"
    }}>
      <Box my="auto" mr="5px">
        <Avatar className={classes.avatar} src={pp}>
          {fullname.charAt(0)}
        </Avatar>
      </Box>

      <Box 
        my="auto"
        width="100%"
      >
        <Typography >
          <b>{fullname}</b>
        </Typography>

        <Typography className={classes.greyColor}>
          Murid
        </Typography>
      </Box>

      <Box 
        display="flex"
        alignContent="center" 
      >
        <Button
          color="primary"
          onClick={onClick}
          disabled={loading}
        >
          {loading ? "MENERIMA..." : "TERIMA"}
        </Button>
      </Box>
    </Box>
  );
}