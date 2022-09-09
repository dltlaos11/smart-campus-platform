import authHeader from "./auth-header";
import api from "./axios";

const getNoticeAllWeb = () => {
  return api.get("api/api/notice/all-web?group_id=4", {
    headers: authHeader(),
  });
};

const noticePost = (group_id, title, content) => {
  return api
    .post(
      "api/api/notice/write",
      {
        group_id,
        title,
        content,
      },
      {
        headers: authHeader(),
      }
    )
    .then((res) => {
      console.log(res);
    });
};

const noticeEdit = (notice_id, group_id, title, content) => {
  return api
    .post(
      "api/api/notice/edit",
      {
        notice_id,
        group_id,
        title,
        content,
      },
      {
        headers: authHeader(),
      }
    )
    .then((res) => {
      console.log(res);
    });
};

const noticeDelete = (group_id, notice_id) => {
  return api
    .delete(
      "api/api/notice/delete",
      {
        group_id,
        notice_id,
      },
      {
        headers: authHeader(),
      }
    )
    .then((res) => {
      console.log(res);
    });
};

const noticeDetail = (group_id) => {
  return api.get(`api/api/notice/detail-web?notice_id=${group_id}`, {
    headers: authHeader(),
  });
};

const noticeService = {
  getNoticeAllWeb,
  noticePost,
  noticeDetail,
  noticeEdit,
  noticeDelete,
};

export default noticeService;
