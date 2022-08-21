import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "antd/dist/antd.css";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Dashboard,
  Notice,
  Admin,
  Chatbot,
  Map,
  Survey,
  Line,
  SurveyWrite,
  SurveyDetail,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import NoticeDetail from "./pages/NoticeDetail";
import NoticeWrite from "./pages/NoticeWrite";

const App = () => {
  const { activeMenu } = useStateContext();
  // const activeMenu = true;

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              {/* <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button> */}
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Pages */}
                <Route path="/notice" element={<Notice />} />
                <Route path="/noticeWrite" element={<NoticeWrite />} />
                <Route path="/noticeDetail/:id" element={<NoticeDetail />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/surveyWrite" element={<SurveyWrite />} />
                <Route path="/surveyDetail/:id" element={<SurveyDetail />} />
                {/* <Route path="/chatbot" element={<Chatbot />} /> */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/map" element={<Map />} />

                {/* Charts */}

                <Route path="/color-mapping" element={<Line />} />

                {/* Dashboard */}
                {/* <Route path="/" element="Information" />
                <Route path="/information" element="Information" /> */}

                {/* 공지사항 */}
                {/* <Route path="/post" element="Post" /> */}

                {/* 알림 */}
                {/* <Route path="/alert" element="Alert" /> */}

                {/* 설문 */}
                {/* <Route path="/query" element="Query" /> */}

                {/* 챗봇 */}
                {/* <Route path="/chatbot" element="Chatbot" /> */}

                {/* 관리자 관리 */}
                {/* <Route path="/admin-controll" element="Admin-Controll" /> */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
