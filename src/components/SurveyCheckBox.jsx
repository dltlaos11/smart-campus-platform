import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Input, Checkbox, Col, Row } from "antd";

const SurveyCheckBox = () => {
  const { TextArea } = Input;
  console.log("재실행 Surtvey_input");

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
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
        <Checkbox.Group
          style={{
            width: "100%",
          }}
          onChange={onChange}
        >
          <Row>
            <Col span={8}>
              <Checkbox value="A">A</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="B">B</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C">C</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D">D</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E">E</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </div>
    </>
  );
};
export default React.memo(SurveyCheckBox);
