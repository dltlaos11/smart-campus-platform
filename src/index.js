import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import Login from "./components/Login";
import { ContextProvider } from "./contexts/ContextProvider";
import { NoticeProvider } from "./contexts/NoticeProvider";
ReactDOM.render(
  <ContextProvider>
    <NoticeProvider>
      {/* <App /> */}
      <Login />
    </NoticeProvider>
  </ContextProvider>,
  document.getElementById("root")
);
