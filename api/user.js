import request from "~/uilts/request";

export function GetUserInfo() {
  return request.get("/api/user");
}

export function UserLogout() {
  return request.post("/api/user");
}
