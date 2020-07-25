import request from "@/utils/request";
export default {
    login(params) {
        return request({
            url: "/api/user/login",
            method: "post",
            data: params
        });
    },
    register(params) {
        return request({
            url: "/api/user/register",
            method: "post",
            data: params
        });
    }
}