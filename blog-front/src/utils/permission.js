import router from "../router";
import store from "../store";
import Cookie from "js-cookie"
//防止由于刷新导致的vuex中数据丢失
//刷新后初始化时对数据进行重置
router.beforeEach((to, from, next) => {
  store.commit('setToken', Cookie.get('token'));
  if (store.state.token) {
    store.commit("changIsSignIn", 1);
  }
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    } else {
      next({ path: '/login' })
    }
  } else {
    next();
  }

})