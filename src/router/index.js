/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-13 15:20:30
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { product } from "./product";
import { member } from "./member";
import { marketing } from "./marketing";
import { order } from "./order";
import { config } from "./wxConfig";
import { sku } from "./sku";
import { component } from "./comment";



// 引入组件
// import home from "./views/home.vue";
// import about from "./about.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const home = [
  /*后台首页*/
  {
    path: "/",
    component: resolve => require(['@/views/home'], resolve),
    meta: {
      title: '',
      keepAlive: false,// 不需要缓存
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [...product, ...member, ...marketing, ...order, ...config, ...sku, ...component]
  },
  /*后台登录页面*/

  {
    path: "/Web/Home/Login",
    component: resolve => require(['@/views/login'], resolve)
  },
  // 404页面
  { path: '*', component: resolve => require(['@/views/404'], resolve) }
]

const routes = [...home]

var router = new VueRouter({
  mode: 'history',
  routes
})




export default router;