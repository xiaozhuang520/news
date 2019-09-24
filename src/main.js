import Vue from "vue";
// + 导入App.vue
import App from "./App";

import Vant from 'vant';
import { Toast } from "vant";

import axios from "axios";

import VueRouter from "vue-router";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Personal from "@/pages/Personal";

// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000"

Vue.use(VueRouter);
Vue.use(Vant);

var routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/personal', component: Personal }
]


var router = new VueRouter({
    routes
})

axios.interceptors.response.use(res => {
    const { message, statusCode } = res.data
    if (message && statusCode === 401) {
        Toast.fail(message);
    }
    if (message == '用户信息验证失败') {
        router.push('/login')
    }
    return res;
},function(err){
	// 请求后台失败时候的错误
    return Toast.fail("网络错误");  
})

router.beforeEach((to,from,next)=>{
    const userToken=localStorage.getItem('token')
    if(to.path=='/personal'){
        if(userToken){
          return next()
        }else{
            return router.push('/login')
        }
    }else{
        next()
    }
})
new Vue({
    el: "#app",
    router,
    render: function (createElement) {
        return createElement(App);
    }
})