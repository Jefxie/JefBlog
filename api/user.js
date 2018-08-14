import request from "~/uilts/request";

export function userLogin(){
    return request.get('/passport/github')
}