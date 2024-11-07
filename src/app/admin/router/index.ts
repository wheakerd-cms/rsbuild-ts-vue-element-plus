// noinspection JSUnusedGlobalSymbols

import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import {useRouterStoreWithout} from "@/app/admin/stores/router-store.ts";
import {usePermissionStore} from "@/app/admin/stores/permission-store.ts";

const NO_REDIRECT_WHITE_LIST: string [] = [
	'/index/login',
];

const baseRouter: RouteRecordRaw [] = [
	{
		path: '/index/login',
		name: 'index-login',
		component: () => import('@/app/admin/views/index/login/index.vue'),
		// component: () => import('@/views/error-page/lighting.vue'),
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error-page/typewriter.vue'),
	},
];

const router: Router = createRouter({
	history: createWebHistory('/admin'),
	routes: baseRouter,
});

router.beforeEach(async (to, from, next) => {
	const routerStore = useRouterStoreWithout();
	const permissionStore = usePermissionStore();

	if (!permissionStore.isLogin) {
		if (NO_REDIRECT_WHITE_LIST.includes(to.path)) {
			next();
			return;
		}
		if (to.path === '/') {
			next('/index/login');
			return;
		}
		next(`/index/login?redirect=${to.path}`);
		return;
	}

	console.log(to.path);

	if (to.path === '/index/login' || to.path === '/') {
		next({path: '/dashboard'});
		return;
	}

	if (routerStore.getIsAddRouters) {
		next();
		return;
	}

	await routerStore.generateRoutes();
	routerStore.getRouters.forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
	routerStore.setIsAddRouters(true);

	const redirectPath = from.query.redirect || to.path;
	const redirect: string = decodeURIComponent(redirectPath as string);
	const nextData = redirect && to.path !== redirect ? {...to, replace: true} : {path: redirect};

	next(nextData);
});

export default router;