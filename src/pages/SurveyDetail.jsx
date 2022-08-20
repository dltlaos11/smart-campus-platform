import React from "react";
import { Link, useParams } from "react-router-dom";

const SurveyDetail = () => {
  let { id } = useParams();
  console.log(id);

  return (
    <div>
      {" "}
      <div className="min-h-screen md:px-10 pt-40">
        <div className="bg-white rounded px-6 py-10 w-full mx-auto mb-10">
          <div className=" w-full h-20 flex">
            <div className="my-auto text-3xl pl-4">title</div>
          </div>
          <hr className="border-gray-400" />
          {/* {router.query.create_time} */}
          <hr className="border-gray-400" />
          <hr className="border-gray-400" />
          <div className="min-h-wow">
            <div className="p-5">
              {/* <div dangerouslySetInnerHTML={{ __html: data }}></div> */}
              content
            </div>
          </div>
          <hr className="border-gray-400" />
          <div className="h-24 flex justify-end w-full">
            <button className="bg-red-800 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32 mr-7">
              수정
            </button>
            <button className="bg-red-800 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetail;
