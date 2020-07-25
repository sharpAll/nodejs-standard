import Vue from "vue";
import VueRouter from "vue-router";
// 登录
import Login from "@/views/Login.vue";
// 布局组件
import CommonLayout from "@/components/CommonLayout.vue";
//首页
import Home from "@/views/Home.vue";
//博客详情
import Detail from "@/views/Detail.vue";
//账户详情
import Personal from "@/views/Personal.vue";
//我的博客-文章列表
import Article from "@/views/Article.vue";
//我的博客-文章新增与编辑
import ArticleEdit from "@/views/ArticleEdit.vue";
Vue.use(VueRouter);

const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path: "/",
    component: CommonLayout,
    children:[
      {
        path:'',
        component:Home,
        name:'home'
      },
      {
        path:'/detail/:id',
        component:Detail
      },
      {
        path:'/personal',
        component:Personal,
        meta:{
          requireAuth:true//true为这个页面需要登录权限
        }
      },
      {
        path:'/article',
        component:Article,
        meta:{
          requireAuth:true//true为这个页面需要登录权限
        },
        name:'article'
      },
      {
        path:'/article/edit',
        name:'editArticle',
        component:ArticleEdit,
        meta:{
          requireAuth:true//true为这个页面需要登录权限
        }
      },
      {
        path:'/article/edit/:id',
        name:'updateArticle',
        component:ArticleEdit,
        meta:{
          requireAuth:true//true为这个页面需要登录权限
        }
      }
    ]
  }
];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });
const router = new VueRouter({
  routes
});

export default router;
