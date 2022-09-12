import authHeader from "./auth-header";
import api from "./axios";

const pushPost = (group_id, push_title, push_content) => {
  return api
    .post(
      "api/api/push/write",
      {
        group_id,
        push_title,
        push_content,
      },
      {
        headers: authHeader(),
      }
    )
    .then((res) => {
      console.log(res);
    });
};

const pushService = {
  pushPost,
};

export default pushService;
