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
  return request({ url: "/api/article", method: "DELETE", data: { id } });
}

export function AddAtricle(data) {
  return request.post("/api/article", data);
}

export function GetComment(id = "") {
  return request.get(`/api/comment?id=${id}`);
}

export function AddComment(data) {
  return request.post(`/api/comment`, data);
}

export function DeleteComment(id) {
  return request({
    url: "/api/comment",
    method: "DELETE",
    data: { id: id }
  });
}

export function GetNoticeCount(id,state){
  return request.post('/api/notice',{id,state})
}

export function GetNoticeList(id,state){
  return request.get(`/api/notice?id=${id}&state=${state}`);
}

export function ModifyNotice(id){
  return request.get('/api/notice/'+id);
}