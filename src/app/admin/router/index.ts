// noinspection JSUnusedGlobalSymbols

import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";

const baseRouter: RouteRecordRaw [] = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/views/error-page/typewriter.vue'),
		// component: () => import('@/views/error-page/lighting.vue'),
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error-page/typewriter.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		redirect: '/404',
	},
];

const router: Router = createRouter({
	history: createWebHistory('/admin'),
	routes: baseRouter,
});

export default router;