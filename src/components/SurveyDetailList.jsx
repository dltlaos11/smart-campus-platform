import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Input } from "antd";
import Header from "./Header";

import SurveyInput from "./SurveyInput";
import Surveytextarea from "./SurveyTextarea";
import SurveyRadio from "./SurveyRadio";
import SurveyCheckBox from "./SurveyCheckBox";
import SurveyAll from "./SurveyAll";

const SurveyDetailList = (props) => {
  const { TextArea } = Input;

  const DetailDiv = tw.div`
  mb-8	
  w-[520px]
  `;
  const [story, setStory] = useState([<SurveyAll />]);

  const selectComponent = {
    input: <SurveyInput />,
    textarea: <Surveytextarea />,
    radio: <SurveyRadio />,
    check: <SurveyCheckBox />,
    all: <SurveyAll />,
  };

  const addStory = () => {
    props.countList.map((item, i) =>
      setStory(
        story.concat(<div key={i}>{selectComponent[props.content]}</div>)
      )
    );
  };
  console.log("재실행 SurveyDetail");
  console.log(props.countList.length, props.countList);
  return (
    <>
      <DetailDiv>
        {props.countList.length === 1 ? (
          <SurveyInput />
        ) : (
          props.countList.map((item, i) => (
            <div key={i}>{selectComponent[props.content]}</div>
          ))
        )}
      </DetailDiv>
    </>
  );
};
export default SurveyDetailList;
