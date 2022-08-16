import React from "react";

const Survey = () => {
  return (
    <div className="min-h-screen md:px-10 pt-40">
      <div className=" bg-white rounded px-6 py-10 w-full mx-auto mb-10">
        <h1 className="text-2xl font-bold">설문</h1>
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

        <div className=" my-2 flex justify-end">
          <button className="w-28 p-2 text-white bg-red-800 shadow-lg rounded">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
export default Survey;
