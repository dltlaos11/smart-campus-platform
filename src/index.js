import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import Login from "./components/Login";
import { ContextProvider } from "./contexts/ContextProvider";
import { NoticeProvider } from "./contexts/NoticeProvider";
import { SurveyProvider } from "./contexts/SurveyProvider";
ReactDOM.render(
  <ContextProvider>
    <NoticeProvider>
      <SurveyProvider>
        {/* <App /> */}
        <Login />
      </SurveyProvider>
    </NoticeProvider>
  </ContextProvider>,
  document.getElementById("root")
);
