// noinspection JSUnusedGlobalSymbols,DuplicatedCode

import {type RouteRecordRaw} from "vue-router";
import {defineStore} from "pinia";
import {pinia} from "@/plugin/pinia";
import {computed, type ComputedRef, type Ref, ref} from "vue";
import {generateRoutes as viewReaderGenerateRoutes} from "@/app/admin/utils/router-helper";

export const useRouterStore = defineStore('admin.router', () => {

	const addRoutes: Ref<RouteRecordRaw []> = ref([]);
	const getAddRouters: ComputedRef<RouteRecordRaw []> = computed(() => addRoutes.value);
	const setAddRouters = (routes: RouteRecordRaw []): void => {
		addRoutes.value = routes;
	};

	const routes: Ref<RouteRecordRaw []> = ref([]);
	const getRouters: ComputedRef<RouteRecordRaw []> = computed(() => routes.value);
	const setRouters = (routers: RouteRecordRaw []): void => {
		routes.value = routers;
	};

	const generateRoutes = async () => {
		return new Promise<void>(async (resolve): Promise<void> => {

			const addRouters: RouteRecordRaw [] = getAddRouters.value.concat(
				[
					{
						path: '/:path(.*)*',
						redirect: '/404',
						name: 'NotFound',
					},
				] as unknown as RouteRecordRaw []
			);

			setRouters(
				await viewReaderGenerateRoutes(addRouters)
			);
			resolve();
		});
	};

	const isAddRoutes: Ref<boolean> = ref(false);
	const getIsAddRouters: ComputedRef<boolean> = computed(() => isAddRoutes.value);
	const setIsAddRouters = (value: boolean): void => {
		isAddRoutes.value = value;
	};


	return {
		addRoutes,
		getAddRouters,
		setAddRouters,

		getRouters,
		generateRoutes,

		getIsAddRouters,
		setIsAddRouters,
	};
}, {
	persist: {
		key: 'admin.router',
		pick: [
			'addRoutes',
		],
	},
});

export const useRouterStoreWithout = () => {
	return useRouterStore(pinia);
};