import React from "react";
import { useSelector } from "react-redux"
import Main from "../../../component/main";

export default function Announcement(){
  const loginUser = useSelector(state => {
    return state.loginUser
  })

  return (
    <React.Fragment>
      <Main loginUser={loginUser}>
        
      </Main>
    </React.Fragment>
  );
}