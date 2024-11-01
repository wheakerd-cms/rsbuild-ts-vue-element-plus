import {createRouter, createWebHistory, Router} from 'vue-router';
import {getAppName} from "@/utils/helper.ts";
import {getRouterModule} from "@/plugin/modules.plugin.ts";

const defaultRouter: Router = createRouter({
    history: createWebHistory('/admin'),
    routes: [
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/error-page/typewriter.vue'),
            // component: () => import('@/views/error-page/lighting.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            redirect: '/404',
        },
    ],
});

const app: string = getAppName(import.meta.env.PUBLIC_ROUTER_MODE);

const router: Router = getRouterModule(app) || defaultRouter;

console.log(
    router.getRoutes()
)

export default router;