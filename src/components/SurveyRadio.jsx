import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Input, Radio, Space } from "antd";

const SurveyRadio = () => {
  console.log("재실행 Surtvey_input");

  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

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
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Option A</Radio>
            <Radio value={2}>Option B</Radio>
            <Radio value={3}>Option C</Radio>
            <Radio value={4}>
              More...
              {value === 4 ? (
                <Input
                  style={{
                    width: 100,
                    marginLeft: 10,
                  }}
                />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </>
  );
};
export default React.memo(SurveyRadio);
