import {createRouter, createWebHistory} from "vue-router"
import Landing from "../views/Landing.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import ChatView from "../views/ChatView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Landing",
            component: Landing
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/register",
            name: "Register",
            component: Register
        },
        {
            path: "/users",
            name: "Users",
            component: ChatView
        },
    ]
})

export default router