import request from "~/uilts/request";

export function GetUserInfo(login = "") {
  const param = login || `?login=${login}`;
  return request.get("/api/user" + login);
}

export function UserLogout() {
  return request.post("/api/user");
}
