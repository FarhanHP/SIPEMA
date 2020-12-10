import React from "react";
import { useSelector } from "react-redux";
import { AnnouncementOutlined as AnnouncementIcon } from "@material-ui/icons";
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";
import { Helmet } from "react-helmet";

export default function Announcement() {
  const loginUser = useSelector((state) => {
    return state.loginUser;
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Pengumuman SIPEMA</title>
      </Helmet>

      <Main loginUser={loginUser}>
        <HeaderTitle
          icon={<AnnouncementIcon fontSize="large" />}
          title="Pengumuman"
        />
      </Main>
    </React.Fragment>
  );
}
