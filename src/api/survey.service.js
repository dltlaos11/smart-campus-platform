import authHeader from "./auth-header";
import api from "./axios";

// const surveyService = () => {
//   return api.get("api/api/survey/all-web?group_id=4", {
//     headers: authHeader(),
//   });
// };

// /api/survey/result?survey_id=6&answer_id=5

const surveySubmitter = (survey_id) => {
  return api.get(`/api/api/survey/submitter?survey_id=${survey_id}`, {
    headers: authHeader(),
  });
};

const submitterAnswer = (survey_id, answer_id) => {
  return api.get(
    `/api/api/survey/submitter?survey_id=${survey_id}&answer_id=${answer_id}`,
    {
      headers: authHeader(),
    }
  );
};

const surveyService = {
  surveySubmitter,
  submitterAnswer,
};

export default surveyService;
