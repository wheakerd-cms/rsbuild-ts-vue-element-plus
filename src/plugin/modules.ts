import {Router} from "vue-router";

const loadRouterModules: Rspack.Context = import.meta.webpackContext('@/app/', {
	recursive: true,
	regExp: /.*\/router\/index\.ts$/,
	mode: 'sync',
});

const getRouterModule = async (name: string): Promise<Router | undefined> => {

	const path: string = `./${name}/router/index.ts`;

	try {
		const module = await loadRouterModules(path) as {
			default: Router,
		};
		const router: Router = module.default;

		return router as Router;
	} catch (error) {
		console.error(`Error loading module at ${path}:`, error);

		return undefined;
	}
}

export {
	getRouterModule,
}