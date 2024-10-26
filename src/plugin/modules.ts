// noinspection JSUnusedGlobalSymbols

import {Router} from 'vue-router';

//	load router model
const loadRouterModules: Rspack.Context = import.meta.webpackContext('@/app', {
	recursive: true,
	regExp: /.*\/router\/index\.ts$/,
	mode: 'sync',
});

const existRouterModule = (path: string): boolean => loadRouterModules.keys().includes(path);

const getRouterModule = (name: string): Router | undefined => {

	const path: string = `./${name}/router/index.ts`;

	if (existRouterModule(path)) {
		const module: { default: Router } = loadRouterModules(path) as { default: Router };

		return module.default as Router;
	}

	console.error(`Router model missing: ${path} file not found, please create.`);
};

// load view model
const loadViewerModules: Rspack.Context = import.meta.webpackContext('@/', {
	recursive: true,
	regExp: /(?:app\/.*\/views\/.*|views\/.*)\.(vue|tsx)$/,
	mode: 'sync',
});


const existViewModule = (path: string): boolean => {
	return loadViewerModules.keys().includes(path);
};

const getViewerModule = (path: string): unknown | undefined => {
	let module: { default: unknown } | undefined;

	if (existViewModule(`./${path}.vue`)) {
		module = loadViewerModules(
			`./${path}.vue`
		) as { default: unknown };
	} else if (existViewModule(`./${path}.tsx`)) {
		module = loadViewerModules(
			`./${path}.tsx`
		) as { default: unknown };
	}

	if (!!module && Object.keys(module).includes('default')) {
		return module.default;
	}

	console.error(
		`${path}.vue or ${path}.tsx was not found in the '/src' directory, please create.`
	);
};

export {
	getRouterModule,
	getViewerModule,
}