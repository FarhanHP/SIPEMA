import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PeopleOutlined as PeopleIcon } from "@material-ui/icons";
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";
import { Helmet } from "react-helmet";
import { getStudents, setStudent } from "../../../request/student";
import { getLoginToken } from "../../../local_storage";
import { Skeleton } from "@material-ui/lab";
import { Divider, Typography, Box, Button, Snackbar } from "@material-ui/core";
import UstudentCard from "../../../component/ustudent_card";
import StudentCard from "../../../component/student_card";

export default function StudentManagement() {
  const loginUser = useSelector((state) => {
    return state.loginUser;
  });
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [loadingUstudents, setLoadingUstudents] = useState(true);

  const [students, setStudents] = useState([]);

  const [stdLoadable, setStdLoadable] = useState(false);

  const [ustudents, setUstudents] = useState([]);

  const [ustdLoadable, setUstdLoadable] = useState(false);

  const [sbMsg, setSbMsg] = useState(null);

  const limit = 3;

  useEffect(() => {
    const token = getLoginToken();

    getStudents(token, 0, limit, true).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const newStudents = data.students;

          const count = data.count;

          setStudents(newStudents);

          setStdLoadable(count > newStudents.length);

          setLoadingStudents(false);
        });
      } else {
        setLoadingStudents(false);
      }
    });

    getStudents(token, 0, limit, false).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const newUstudents = data.students;

          const count = data.count;

          setUstudents(newUstudents);

          setUstdLoadable(count > newUstudents.length);

          setLoadingUstudents(false);
        });
      } else {
        setLoadingStudents(false);
      }
    });
  }, []);

  const loadingElement = [];

  for (let i = 0; i < limit; i++) {
    loadingElement.push(
      <Box
        my="10px"
        width={{
          xs: "100%",
          sm: "500px",
        }}
        mx="auto"
      >
        <Skeleton variant="rect" height="60px" />
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Manajemen Murid SIPEMA</title>
      </Helmet>

      <Main loginUser={loginUser}>
        <HeaderTitle
          icon={<PeopleIcon fontSize="large" />}
          title="Manajemen Murid"
        />

        <Box mt="50px">
          <Box mb="20px">
            {students.map((value, index) => {
              const _id = value._id;

              const fullname = value.user.fullname;

              return (
                <Box display="flex" justifyContent="center">
                  <StudentCard
                    key={_id}
                    student={value}
                    onKick={async () => {
                      return await setStudent(getLoginToken(), _id, false).then(
                        (res) => {
                          if (res.ok) {
                            //update ustudents
                            const limit = ustudents.length + 1;

                            getStudents(getLoginToken(), 0, limit, false).then(
                              (res) => {
                                if (res.ok) {
                                  res.json().then((data) => {
                                    const count = data.count;

                                    const newUstudents = data.students;

                                    setUstudents(newUstudents);

                                    setUstdLoadable(
                                      newUstudents.length < count
                                    );

                                    setLoadingUstudents(false);
                                  });
                                } else {
                                  setLoadingUstudents(false);
                                }
                              }
                            );

                            setUstudents([]);

                            setLoadingUstudents(true);
                            //update ustudents end

                            //update students
                            const newStudents = students.slice();

                            newStudents.splice(index, 1);

                            setStudents(newStudents);

                            setSbMsg(`${fullname} berhasil ditendang.`);
                            //update students end

                            return true;
                          } else {
                            setSbMsg("Gagal menendang murid.");

                            return false;
                          }
                        }
                      );
                    }}
                  />
                </Box>
              );
            })}

            {loadingStudents ? (
              loadingElement
            ) : students.length <= 0 ? (
              <Box mt="20px" mb="50px">
                <Typography align="center" gutterBottom>
                  Murid Kosong.
                </Typography>
              </Box>
            ) : null}
          </Box>

          {stdLoadable && !loadingStudents ? (
            <Box display="flex" justifyContent="center" alignContent="center">
              <Button
                color="primary"
                onClick={() => {
                  const priorStudents = students.slice();

                  setLoadingStudents(true);

                  getStudents(
                    getLoginToken(),
                    priorStudents.length,
                    limit,
                    true
                  ).then((res) => {
                    if (res.ok) {
                      res.json().then((data) => {
                        const newStudents = priorStudents.concat(data.students);

                        setStudents(newStudents);

                        setStdLoadable(newStudents.length < data.count);

                        setLoadingStudents(false);
                      });
                    } else {
                      setLoadingStudents(false);
                    }
                  });
                }}
              >
                MUAT LEBIH BANYAK
              </Button>
            </Box>
          ) : null}

          <Box mt="50px">
            <Typography variant="h5" gutterBottom>
              Murid yang Belum Disetujui
            </Typography>
          </Box>

          <Divider />

          <Box mb="20px" mt="10px">
            {ustudents.map((value, index) => {
              const _id = value._id;

              const fullname = value.user.fullname;

              return (
                <Box display="flex" justifyContent="center">
                  <UstudentCard
                    key={_id}
                    student={value}
                    onAcc={async () => {
                      return await setStudent(getLoginToken(), _id, true).then(
                        (res) => {
                          if (res.ok) {
                            //update students
                            const limit = students.length + 1;
                            setStudents([]);
                            setLoadingStudents(true);
                            getStudents(getLoginToken(), 0, limit, true).then(
                              (res) => {
                                if (res.ok) {
                                  res.json().then((data) => {
                                    const newStudents = data.students;

                                    const count = data.count;

                                    setStudents(newStudents);

                                    setStdLoadable(newStudents.length < count);

                                    setLoadingStudents(false);
                                  });
                                } else {
                                  setLoadingStudents(false);
                                }
                              }
                            );
                            //update students end

                            //update ustudents
                            const newUstudents = ustudents.slice();
                            newUstudents.splice(index, 1);
                            setUstudents(newUstudents);
                            //update ustudents end

                            setSbMsg(`${fullname} diterima menjadi murid.`);

                            return true;
                          } else {
                            setSbMsg(`Gagal menerima murid`);
                            return false;
                          }
                        }
                      );
                    }}
                  />
                </Box>
              );
            })}

            {loadingUstudents ? (
              loadingElement
            ) : ustudents.length <= 0 ? (
              <Box pb="50px" mt="20px">
                <Typography gutterBottom align="center">
                  Murid yang belum disetujui kosong.
                </Typography>
              </Box>
            ) : null}
          </Box>

          {ustdLoadable && !loadingUstudents ? (
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              pb="50px"
            >
              <Button
                color="primary"
                onClick={() => {
                  const priorUstudents = ustudents.slice();

                  setLoadingUstudents(true);

                  getStudents(
                    getLoginToken(),
                    priorUstudents.length,
                    limit,
                    false
                  ).then((res) => {
                    if (res.ok) {
                      res.json().then((data) => {
                        const newUstudents = priorUstudents.concat(
                          data.students
                        );

                        setUstudents(newUstudents);

                        setUstdLoadable(newUstudents.length < data.count);

                        setLoadingUstudents(false);
                      });
                    } else {
                      setLoadingUstudents(false);
                    }
                  });
                }}
              >
                MUAT LEBIH BANYAK
              </Button>
            </Box>
          ) : null}
        </Box>
      </Main>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        message={sbMsg}
        open={sbMsg}
        key={sbMsg}
        autoHideDuration={6000}
        onClose={() => {
          setSbMsg(null);
        }}
      />
    </React.Fragment>
  );
}
