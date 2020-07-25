import request from "@/utils/request";
export default {
    getUserInfo() {
        return request({
            url: "api/user/info",
            method: "get"
        });
    },
    updateUserInfo(params) {
        return request({
            url: "api/user/updateUser",
            method: "post",
            data:params
        });
    }
}