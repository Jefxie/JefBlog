import request from "~/uilts/request";

export function GetQiniuToken() {
  return request("/api/qiniu/token");
}

export function UploadFileToQiniu(file, token) {
  const url = "http://upload-z2.qiniup.com";
  const data = new FormData();

  data.append("file", file, file.name);
  data.append("token", token);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: false
  };
  return request.post(url, data, config);
}
