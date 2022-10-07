import React from "react";
import App from "../App";
import GroupList from "./GroupList";

const LevelCheck = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user.response.level !== 0 ? (
        // <App />
        // (user.response.level === 1 ?  <GroupList />:<App />) 레벨 업데이트 한번 되고 
        <GroupList />
      ) : (
        // <GroupList />
        <App />
      )}
    </>
  );
};

export default LevelCheck;
