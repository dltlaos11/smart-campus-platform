import React, { createContext, useContext, useState } from "react";

const SurveyContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const SurveyProvider = ({ children }) => {
  let [surveyTitle, setSurveyTitle] = useState("");
  let [surveyContent, setSurveyContent] = useState("");

  let [surveyDetailId, setSurveyDetailId] = useState("");

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SurveyContext.Provider
      value={{
        initialState,
        surveyTitle,
        setSurveyTitle,
        surveyContent,
        setSurveyContent,
        surveyDetailId,
        setSurveyDetailId,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useStateSurveyContext = () => useContext(SurveyContext);
