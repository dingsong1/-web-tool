import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Home from '../views/home/index.vue'
import base64Conversion from '../views/picture/Base64ConversionPicture.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: "/hell",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/picture",
        name: "picture",
        component: () =>
            import(/* webpackChunkName: "picture" */ '../views/picture/index.vue')
    },
    {
        path:'/picture/base64Conversion',
        name:'base64-conversion-picture',
        component:base64Conversion,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
