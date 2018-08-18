import request from "~/uilts/request";

export function GetUserInfo(login = "") {
  return request.get("/api/user" + login);
}

export function UserLogout() {
  return request.post("/api/user");
}

export function GetGitHubStar() {
  return request.get(
    "https://api.github.com/repos/Jefxie/JefBlog",
    { withCredentials: false }
  );
}
