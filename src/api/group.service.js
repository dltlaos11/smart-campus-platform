import authHeader from "./auth-header";
import api from "./axios";

const getGroupAll = () => {
  return api.get("/api/group/all-group-app", { headers: authHeader() });
};

const groupService = {
  getGroupAll,
};

export default groupService;
