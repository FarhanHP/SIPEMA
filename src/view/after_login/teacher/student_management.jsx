import React from "react";
import { useSelector } from "react-redux";
import { PeopleOutlined as PeopleIcon } from "@material-ui/icons"
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";
import { Helmet } from "react-helmet";

export default function StudentManagement(){
  const loginUser = useSelector(state => {
    return state.loginUser
  })

  return (
    <React.Fragment>
      <Helmet>
        <title>Manajemen Murid SIPEMA</title>
      </Helmet>

      <Main loginUser={loginUser}>
        <HeaderTitle icon={<PeopleIcon fontSize="large" />}  title="Manajemen Murid"/>
      </Main>
    </React.Fragment>
  );
}