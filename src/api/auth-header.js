export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.response.jwt_token) {
    // return { Authorization: 'Bearer ' + user.accessToken };
    return { jwt_token: user.response.jwt_token };
  } else {
    return {};
  }
}
