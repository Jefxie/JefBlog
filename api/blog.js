import request from "~/uilts/request";

export function GetCategoryList() {
  return request.get("/api/category");
}
export function AddCategory(name, alias) {
  return request.post("/api/category", { name, alias });
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

export function RemoveArticle(id = "") {
  return request({ url: "/api/article", methods: "DELETE", data: { id } });
}

export function AddAtricle(data) {
  return request.post('/api/article',data);
}
