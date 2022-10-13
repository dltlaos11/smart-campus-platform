import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import { useStateSurveyContext } from "../contexts/SurveyProvicer";

import authHeader from "../api/auth-header";
import api from "../api/axios";

const SurveyDetail = () => {
  let { id } = useParams();
  let { surveyTitle, setSurveyTitle } = useStateSurveyContext();
  let { surveyContent, setSurveyContent } = useStateSurveyContext();

  let { surveyDetailId, setSurveyDetailId } = useStateSurveyContext();
  let { isclick, setIsclick } = useStateContext();

  const navigate = useNavigate();
  console.log(id);

  const getDetailSurvey = () => {
    // navigate("/");
    console.log(isclick?.group_id);
    return api.get(`/api/api/survey/detail?survey_id=${id}`, {
      headers: authHeader(),
    });
  };

  useEffect(() => {
    const getSurveyDetail = async () => {
      await getDetailSurvey().then(
        (res) => console.log(res.data.response),
        (err) => console.log(err)
      );
    };
    getSurveyDetail();
    // navigate(`survey/surveyDetail/${id}`); // 😨
    // <Link to={`/surveyDetail/${id}`}></Link>;
    setSurveyDetailId(id);
  }, []);

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
            <button className="bg-red-600 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32 mr-7">
              수정
            </button>
            <button className="bg-red-600 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetail;
