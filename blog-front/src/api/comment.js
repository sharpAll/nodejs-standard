import request from "@/utils/request";
export default {
    public(params) {
        return request({
            url: "/api/comment/public",
            method: "post",
            data: params
        });
    },
    list(params) {
        return request({
            url: "/api/comment/list",
            method: "get",
            params
        });
    }
}