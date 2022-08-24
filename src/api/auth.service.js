import api from "./axios";

const login = (user_id, password) => {
  return api
    .post("/api/admin/login", {
      user_id,
      password,
    })
    .then((res) => {
      if (res.data.response.jwt_token) {
        console.log("222");
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      console.log(res);

      return res.data;
    });
};

const authService = {
  login,
};

export default authService;
