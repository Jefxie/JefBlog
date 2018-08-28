import request from "~/uilts/request";
import Cookies from "js-cookie";
import ENV from "~/uilts/env.config";

export function GetUserInfo(login = "") {
  if (login) {
    login = "?login=" + login;
  }
  return request.get("/api/user" + login);
}

export function UserLogout() {
  return request.post("/api/user");
}

export function ModifyUserInfo(data) {
  
  return request({
    method: "PUT",
    url: "/api/user",
    data
  });
}

export function GetGitHubStar() {
  return request.get(ENV.githubStart, {
    withCredentials: false
  });
}

export function ToLogin() {
  const _url = window.location.href;
  Cookies.set("_returnUrl", _url.replace(ENV.returnUrl, ""));
  const _target = ENV.passportUrl;
  window.location.assign(_target);
}
