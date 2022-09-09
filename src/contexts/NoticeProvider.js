import React, { createContext, useContext, useState } from "react";

const NoticeContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const NoticeProvider = ({ children }) => {
  let [noticeTitle, setNoticeTitle] = useState("");
  let [noticeContent, setNoticeContent] = useState("");

  let [noticeDetailId, setNoticeDetailId] = useState("");

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NoticeContext.Provider
      value={{
        initialState,
        noticeTitle,
        setNoticeTitle,
        noticeContent,
        setNoticeContent,
        noticeDetailId,
        setNoticeDetailId,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};

export const useStateNoticeContext = () => useContext(NoticeContext);
