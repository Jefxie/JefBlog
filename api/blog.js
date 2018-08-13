import request from "~/uilts/request";

export function GetCategoryList() {
  return request.get("/api/category");
}
