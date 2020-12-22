import Vue from 'vue'
import App from './App.vue'
//router 路由文件
import router from './router/index'
//axios请求设置
import axios from './axios/axios.post.form'
//Mock 数据模拟
// import mock from './mock/index'
//引入element-ui
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// //注册组件
// Vue.use(ElementUI)
//取消 Vue 所有的日志与警告。
Vue.config.silent = true;
Vue.config.devtools = false;
Vue.config.productionTip = false;


// Vue.config.productionTip = true;
//原型链上添加请求
Vue.prototype.$axios =  axios;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')