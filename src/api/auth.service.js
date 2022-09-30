import api from "./axios";
import authHeader from "./auth-header";

const login = (user_id, password) => {
  return api
    .post("api/api/admin/login", {
      user_id,
      password,
    })
    .then((res) => {
      if (res.data.response.jwt_token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      console.log(res);

      return res.data;
    });
};

const getAdminList = () => {
  return api.get("api/api/admin/list", { headers: authHeader() });
};

const updateLevel = (user_id, level) => {
  return api
    .post(
      "/api/api/admin/update_level",
      { user_id, level },
      {
        headers: authHeader(),
      }
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

const authService = {
  login,
  getAdminList,
  updateLevel,
};

export default authService;
