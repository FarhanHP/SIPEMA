import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useParams, Switch } from "react-router-dom";
import StudentDetailLoading from "../../../../component/loading/student_detail_loading";
import Main from "../../../../component/main";
import StudentDetailLayout from "../../../../component/student_detail_layout";
import { getLoginToken } from "../../../../local_storage";
import { getStudent } from "../../../../request/student";
import Payment from "./payment";
import Progress from "./progress";

export default function StudentDetail(){
  const loginUser = useSelector(state => {
    return state.loginUser;
  });

  const limit = 5;

  const {studentId} = useParams();

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getStudent(studentId, getLoginToken()).then(res => {
      if(res.ok){
        res.json().then(data => {
          setStudent(data);
          setLoading(false);
        })
      }

      else{
        setLoading(false);
      }
    })
  }, [studentId])
  
  return (
    <Main loginUser={loginUser}>
      {loading ? (
        <StudentDetailLoading
          tabs={[{
            label: "Bacaan",
            url: `/s/${studentId}`
          }, {
            label: "Pembayaran",
            url: `/s/${studentId}/pembayaran`
          }]}
          number={limit}
        />
      ):student ? (
        <StudentDetailLayout 
          student={student}
          tabs={[{
            label: "Bacaan",
            url: `/s/${studentId}`
          }, {
            label: "Pembayaran",
            url: `/s/${studentId}/pembayaran`
          }]}
        >
          <Switch>
            <Route path="/s/:studentId/pembayaran">
              <Payment/>
            </Route>

            <Route path="/s/:studentId">
              <Progress/>
            </Route>
          </Switch>
        </StudentDetailLayout>
      ):(
        <Box 
          height="70vh" 
          width="100%" 
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5">
            Murid tidak ada.
          </Typography>
        </Box>
      )}
    </Main>
  )
}