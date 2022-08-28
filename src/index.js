import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import Login from "./components/Login";
import { ContextProvider } from "./contexts/ContextProvider";

ReactDOM.render(
  <ContextProvider>
    {/* <App /> */}
    <Login />
  </ContextProvider>,
  document.getElementById("root")
);
