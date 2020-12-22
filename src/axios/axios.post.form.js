/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-28 19:00:49
 */
import axios from 'axios';
import Vue from 'vue';
//登录状态码说明  200成功 400操作失败  401登录失效 411权限

// 自定义配置新建一个 axios 实例
const axiosPostForm = axios.create({
    baseURL: "", //api的base_url
    timeout: 50000, //request timeout
    headers: {
        'Content-Type': 'application/json'
    }
})

//状态操作码
// const actions = {
//     200: (retData) => {
//         return retData.data;
//     },
//     400: (retData) => {
//         Vue.prototype.$message.error(retData.Message)
//         return false;
//     },
//     401: () => {
//         Vue.prototype.$message.error(`登陆失效`)
//         window.location.href = "/Web/Home/Login";
//         return false;

//     },
//     411: () => {
//         Vue.prototype.$message.error(`对不起你的权限不够！`);
//         return false;
//     }
// }
//创建请求过滤器
axiosPostForm.interceptors.request.use(
    config => {
        //根据实际项目修改拦截器
        config.data = config.data || config.params || {};
        // console.log(`请求方式：${JSON.stringify(config.method)}`);
        // console.log(`请求路劲：${JSON.stringify(config.url)}`);
        // console.log(`请求参数：${JSON.stringify(config.data)}`);
        return config;
    },
    error => {
        Vue.prototype.$message.error(`发送请求错误：${error}`)
        return false;
    });

//创建响应过滤器
axiosPostForm.interceptors.response.use(
    response => {
        // var retData  = response;
        // actions[retData.Code](retData);
        if(response.data.Code == 400){
            Vue.prototype.$message.error(`${response.data.Message}`);
            return false
        }else{
           return response.data
        }
    },
    error => {
        Vue.prototype.$message.error(`请求接口错误：${error}`)
        return false;
    })

export default axiosPostForm