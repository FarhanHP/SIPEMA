import { Box, Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(()=>{
  return {
    greyColor: {
      color: "grey"
    }
  }
})

export default function TextDivider(props){
  const classes = useStyles()

  const text = props.text;

  return (
    <Box display="flex" alignContent="center">
      <Box flex={1} my="auto">
        <Divider/>
      </Box>

      <Box mx="5px">
        <Typography className={classes.greyColor}>
          {text}
        </Typography>
      </Box>

      <Box flex={1} my="auto"> 
        <Divider/>
      </Box>
    </Box>
  )
}