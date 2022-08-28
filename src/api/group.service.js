import authHeader from "./auth-header";
import api from "./axios";

const getGroupAll = () => {
  return api.get("api/api/group/all-group-app", { headers: authHeader() });
};

const getGroupOwn = () => {
  return api.get("api/api/group/admin-group-list", { headers: authHeader() });
};

const groupService = {
  getGroupAll,
  getGroupOwn,
};

export default groupService;
