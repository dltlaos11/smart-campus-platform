import React from "react";
import tw from "tailwind-styled-components";

const SurveyWrite = () => {
  let data =
    "내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n \
    내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용\n내용";
  const Circle = tw.button`
    w-[50px]
    h-100
    bg-black
    text-white
  `;
  const onClick = () => console.log("2");
  return (
    <>
      {/* <div className="relative min-h-[1000px]">
        <p>This works</p>
        {data.split("\n").map((line) => {
          return (
            <span>
              {line}
              <br />
            </span>
          );
        })}
      </div> */}
      <div className="min-h-screen md:px-10 pt-40">
        <div className=" bg-white rounded px-6 py-10 w-full mx-auto mb-10">
          <h1 className="text-2xl font-bold">공지사항 작성</h1>
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
          <div className="">
            {" "}
            <form className="my-auto border-y border-gray-400 w-full py-1">
              <input type="file" multiple></input>
            </form>
          </div>

          <div className=" my-2 flex justify-end">
            <button className="w-28 p-2 text-white bg-red-800 shadow-lg rounded">
              등록
            </button>
          </div>
        </div>
      </div>
      <Circle
        className="fixed top-[80px] right-[500px] bg-blue-700"
        onClick={onClick}
      >
        One
      </Circle>
      <Circle
        className="fixed top-[200px] right-[500px] bg-blue-700"
        onClick={onClick}
      >
        One
      </Circle>
      <Circle
        className="fixed top-[320px] right-[500px] bg-blue-700"
        onClick={onClick}
      >
        One
      </Circle>
      <Circle
        className="fixed top-[440px] right-[500px] bg-blue-700"
        onClick={onClick}
      >
        One
      </Circle>
    </>
  );
};
export default SurveyWrite;
