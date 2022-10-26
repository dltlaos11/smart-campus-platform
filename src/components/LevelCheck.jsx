import React from "react";
import App from "../App";
import GroupList from "./GroupList";

const LevelCheck = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("레벨 체크");
  return (
    <>
      {user.response.level === 0 ? (
        // <App />
        // <GroupList />
        <App />
      ) : // (
      //   <GroupList />
      // )
      user.response.level === 1 ? (
        <App />
      ) : (
        <GroupList />
      )}
    </>
  );
};

export default LevelCheck;
