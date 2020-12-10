import React from "react";
import { useSelector } from "react-redux";
import { AttachMoney as MoneyIcon } from "@material-ui/icons";
import Main from "../../../component/main";
import HeaderTitle from "../../../component/header_title";

export default function StudentPayment() {
  const loginUser = useSelector((state) => {
    return state.loginUser;
  });

  return (
    <React.Fragment>
      <Main loginUser={loginUser}>
        <HeaderTitle
          icon={<MoneyIcon fontSize="large" />}
          title="Riwayat Pembayaran Murid"
        />
      </Main>
    </React.Fragment>
  );
}
