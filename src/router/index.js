import Vue from "vue";
import VueRouter from "vue-router";
import homePage from "@/views/home-page";
import boardApp from "@/views/board-app";
import taskDetails from "@/views/task-details";
import userDetails from "@/views/user-details";
import appLogin from "@/views/app-login";
import appSignup from "@/views/app-signup";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "homePage",
        component: homePage
    },
    {
        path: "/login",
        name: "appLogin",
        component: appLogin
    },
    {
        path: "/signup",
        name: "appSignup",
        component: appSignup
    },
    {
        path: "/board/:boardId",
        name: "boradApp",
        component: boardApp,
        children: [{
            path: '/task/:taskId',
            component: taskDetails,
        }]
    },
    {
        path: "/user/:userId",
        name: "userDetails",
        component: userDetails
    },

];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;