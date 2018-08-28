import request from "~/uilts/request";
import ENV from "~/uilts/env.config";

export function GetQiniuToken() {
  return request("/api/qiniu/token");
}

export function UploadFileToQiniu(file, token) {
  const url = ENV.imgAction;
  const data = new FormData();

  data.append("file", file, file.name);
  data.append("token", token);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: false
  };
  return request.post(url, data, config);
}
