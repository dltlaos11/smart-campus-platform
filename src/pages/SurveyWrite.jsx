import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Input } from "antd";
import SurveyDetailList from "../components/SurveyDetailList";
import MAIN_DATA from "../components/MainData";

import SurveyAll from "../components/SurveyAll";

const SurveyWrite = () => {
  const { TextArea } = Input;

  const Circle = tw.button`
    w-[50px]
    h-100
    bg-black
    text-white
  `;

  const CreateListDiv = tw.div`
  pt-16
  w-full	
  flex
  items-center
  flex-col
  `;

  // const [countList, setCountList] = useState([0]);

  // const [content, setContent] = useState();

  let [story, setStory] = useState([<SurveyAll />]);

  let countArr = [...story];

  // let counter = countArr.slice(-1)[0];

  const addStory = () => {
    setStory(story.concat(<SurveyAll />));
  };

  // const onClick = (e) => {
  //   const { name } = e.target;
  //   console.log(name);
  //   setContent(name);

  //   counter += 1;
  //   countArr.push(counter); // index 사용 X
  //   // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
  //   setCountList(countArr);
  //   console.log(countList);
  // };

  const onClickDelete = () => {
    countArr.pop();
    setStory(countArr);
  }; // 컴포넌트 안에 버튼만들기

  console.log("재실행 Surtvey_write", story);

  return (
    <>
      <div className="min-h-screen md:px-[180px] pt-20">
        <div className=" bg-white rounded px-6 py-10 w-full mx-auto mb-10">
          <h1 className="text-2xl font-bold">설문 작성</h1>

          <div className="h-24 flex justify-end w-full">
            <button
              onClick={() => {
                onClickDelete();
              }}
              className="bg-red-800 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32 mr-7"
            >
              삭제
            </button>
          </div>
          <div className="fixed flex flex-col right-[100px]"></div>
          <div className=" h-16 flex">
            <div className="flex flex-row my-auto w-full text-center border border-gray-400">
              <div className="flex basis-2/12 bg-gray-200">
                <div className="m-auto border-l">제목</div>
              </div>
              <form className="basis-10/12 border-gray-400 border-l">
                <input className="w-full outline-none h-10 ml-3" />
              </form>
            </div>
          </div>
          <div className="text-xl font-bold mb-2">내용</div>
          <div className=" h-good"></div>

          {story}
          <div className=" my-2 flex justify-end">
            <button
              className="w-28 p-2 text-white bg-red-800 shadow-lg rounded"
              onClick={() => {
                addStory();
                console.log(story);
              }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SurveyWrite;
