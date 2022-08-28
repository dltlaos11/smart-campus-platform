import authHeader from "./auth-header";
import api from "./axios";

const getNoticeAllWeb = () => {
  return api.get("api/api/notice/all-web?group_id=4", {
    headers: authHeader(),
  });
};

const noticeService = {
  getNoticeAllWeb,
};

export default noticeService;
