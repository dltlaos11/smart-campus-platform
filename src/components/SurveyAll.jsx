import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Input } from "antd";

const SurveyAll = () => {
  const { TextArea } = Input;
  console.log("재실행 Surtvey_input");

  return (
    <>
      {" "}
      <div>
        <TextArea showCount maxLength={100} />
      </div>
    </>
  );
};
export default React.memo(SurveyAll);
