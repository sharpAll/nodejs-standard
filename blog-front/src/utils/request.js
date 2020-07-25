import axios from "axios";
import { Loading, Message } from "element-ui";
import store from '@/store/index'

// 统一配置加载中
const loading = {
  loadingInstance: null,
  open() {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        target: ".main"
      });
    }
  },
  close() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  }
};

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
  // headers: {}
});
// Add a request interceptor
request.interceptors.request.use(
  config => {
    loading.open();
    //添加token
    if (store.state.token) {
      config.headers['Authorization'] = `Bearer ${store.state.token}`
    }
    return config
  },
  error => {
    loading.close();
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    loading.close();
    // 如果后台响应状态码不是 2000 , 说明后台服务有异常,统一可在此处处理
    const resp = response.data;
    if (resp.code !== 200) {
      Message({
        message: resp.msg || "系统异常",
        type: "warning",
        duration: 5 * 1000 // 停留时长
      });
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    loading.close();
    // 当请求接口出错时, 进行弹出错误提示, 如 404, 500, 请求超时
    console.log("response error", error.response.status);
    Message({
      message: error.msg,
      type: "error",
      duration: 5 * 1000
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default request;
