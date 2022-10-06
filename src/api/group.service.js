import authHeader from "./auth-header";
import api from "./axios";

const getGroupAll = () => {
  return api.get("api/api/group/all-group-app", { headers: authHeader() });
};

const getGroupOwn = () => {
  return api.get("api/api/group/admin-group-list", {
    headers: authHeader(),
  });
};

const getAdminGroupCallList = () => {
  return api.get("api/api/group/admin-group-call-list", {
    headers: authHeader(),
  });
};

const postAdminGroupCall = (group_id) => {
  return api
    .post(
      "/api/api/group/admin-group-call",
      { group_id },
      { headers: authHeader() }
    )
    .then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
};

const putAdminGroupAccept = (admin_group_id) => {
  return api
    .put(
      "/api/api/group/admin-group-accept",
      { admin_group_id },
      { headers: authHeader() }
    )
    .then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
};

const groupService = {
  getGroupAll,
  getGroupOwn,
  getAdminGroupCallList,
  postAdminGroupCall,
  putAdminGroupAccept,
};

export default groupService;
