import request from "~/uilts/request";
import Cookies from "js-cookie";

export function GetUserInfo(login = "") {
  return request.get("/api/user" + login);
}

export function UserLogout() {
  return request.post("/api/user");
}

export function GetGitHubStar() {
  return request.get("https://api.github.com/repos/Jefxie/JefBlog", {
    withCredentials: false
  });
}

export function ToLogin() {
  const _url = window.location.href;
  Cookies.set(
    "_returnUrl",
    // _url.replace("http://localhost:3010", "")
    _url.replace("https://www.jef.site", "")
  );
  // const _target = "http://127.0.0.1:7001/passport/github";
  const _target = "https://api.jef.site/passport/github";
  window.location.assign(_target);
}
