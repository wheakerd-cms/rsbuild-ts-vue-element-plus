import type {RouteRecordRaw} from "vue-router";
import {cloneDeep} from "lodash";
import {getViewerModule} from "@/plugin/modules.ts";

const LayoutView = getViewerModule('app/admin/views/LayoutView');

const getRoutes = (routes: RouteRecordRaw [], layout: unknown | { name: string }) => {
	let routerMap: RouteRecordRaw [] = [];

	const requiredKey: string [] = [
		'path',
		'name',
		'redirect',
		'meta',
	];

	for (const route of routes) {
		const data: {
			[key: string]: any
		} = Object.entries(route).reduce<{
			[key: string]: any
		}>(
			(
				obj: { [key: string]: any }, [key, value]: [string, [string, any] []]) => {
				if (requiredKey.includes(key) && !!value) obj [key] = value;
				return obj;
			}, {} as { [key: string]: any }
		);

		const component: undefined | string = route.component as unknown as undefined | string;

		if (!!component) {
			data.component =
				component === '#'
					? layout
					: component === '##' ? {
						name: 'ParentLayout'
					} : getViewerModule(component);
		}

		if (!!route.children) {
			data.children = getRoutes(route.children, layout);
		}

		routerMap.push(data as RouteRecordRaw);
	}

	return routerMap;
};

const generateRoutes = (routes: RouteRecordRaw []): RouteRecordRaw[] => {
	const routers: RouteRecordRaw [] = cloneDeep(routes);

	return getRoutes(routers, LayoutView);
}

export {
	generateRoutes,
};