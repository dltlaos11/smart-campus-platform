import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Input } from "antd";

const SurveyInput = () => {
  const { TextArea } = Input;
  console.log("재실행 Surtvey_input");

  return (
    <>
      <input
        id="question"
        type="text"
        name="question"
        placeholder="질문"
        autocomplete="given-name"
        class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        required
      />
      <div>
        <Input showCount maxLength={20} />
      </div>
    </>
  );
};
export default React.memo(SurveyInput);
