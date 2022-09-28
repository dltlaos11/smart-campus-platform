import React from "react";
import App from "../App";
import GroupList from "./GroupList";

const LevelCheck = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user.response.level === 8 ? (
        <App />
      ) : (
        // <GroupList />
        <GroupList />
        // <App />
      )}
    </>
  );
};

export default LevelCheck;
