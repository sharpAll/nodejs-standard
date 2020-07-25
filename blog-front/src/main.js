import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./utils/permission";
import "element-ui/lib/theme-chalk/index.css";
import '@/assets/scss/reset.scss'
import '@/assets/font/iconfont.css'
import '@/assets/scss/common.scss'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
