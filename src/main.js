import Vue from "vue";
// + 导入App.vue
import App from "./App";

import Vant from 'vant';

import axios from "axios";

import VueRouter from "vue-router";

import Login from "@/pages/Login";
import Register from "@/pages/Register";

// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000"

Vue.use(VueRouter);
Vue.use(Vant);

var routes=[
    {path:'/login',component:Login},
    {path:'/register',component:Register}
]
var router=new VueRouter({
    routes
})

new Vue({
    el: "#app",
    router,
    render: function(createElement){
        return createElement(App);
    }
})