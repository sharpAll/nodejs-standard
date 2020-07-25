import request from "@/utils/request";
export default {
    allList() {
        return request({
            url: "api/article/allList",
            method: "get"
        });
    },
    articleAdd(params){
        return request({
            url: "api/article/add",
            method: "post",
            data:params
        });
    },
    myArticles(){
        return request({
            url: "api/article/myList",
            method: "get"
        });
    },
    articleDel(params){
        return request({
            url: "api/article/delete",
            method: "post",
            data:params
        });
    },
    articleDetail(params){
        return request({
            url: "api/article/detail",
            method: "get",
            params
        });
    },
    articleUpdate(params){
        return request({
            url: "api/article/update",
            method: "post",
            data:params
        });
    },
}