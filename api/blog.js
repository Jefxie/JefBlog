import request from "~/uilts/request";

export function GetCategoryList() {
  return request.get("/api/category");
}

export function GetArticleList(category = "", total = 10, page = 1) {
  const params = `?total=${total}&page=${page}${
    category ? "&category=" + category : ""
  }`;
  return request.get("/api/article" + params);
}

export function GetArticleDetail(id = "") {
  return request.get("/api/article/" + id);
}
