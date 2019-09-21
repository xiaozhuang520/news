import Vue from "vue"
// + 导入App.vue
import App from "./App"

import VueRouter from "vue-router"

import Login from "@/pages/Login"

Vue.use(VueRouter)

var routes=[
    {path:'/login',component:Login}
]
var router=new VueRouter({
    routes
})

new Vue({
    el: "#app",
    router,
    render: function(createElement){
        return createElement(App)
    }
})