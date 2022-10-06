import authHeader from "./auth-header";
import api from "./axios";

const surveyService = () => {
  return api.get("api/api/survey/all-web?group_id=4", {
    headers: authHeader(),
  });
};

export default surveyService;
