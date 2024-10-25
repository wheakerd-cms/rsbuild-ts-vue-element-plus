import {defineConfig} from '@rsbuild/core';
import {pluginVue} from '@rsbuild/plugin-vue';
import * as path from "node:path";
import {pluginTypeCheck} from "@rsbuild/plugin-type-check";
import {pluginSass} from "@rsbuild/plugin-sass";
import {pluginVueJsx} from "@rsbuild/plugin-vue-jsx";
import {pluginBabel} from "@rsbuild/plugin-babel";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
	dev: {
		hmr: true,
		lazyCompilation: true,
		liveReload: true,
		progressBar: process.env.mode === 'production',
	},
	server: {
		base: '/',
		compress: true,
		host: '0.0.0.0',
		port: 8080,
		printUrls: true,
		strictPort: true,
	},
	plugins: [
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
		}),
		pluginVue(),
		pluginVueJsx(),
		pluginSass(),
		pluginTypeCheck(),
	],
	source: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		entry: {
			index: './src/main.ts',
		},
	},
	output: {
		distPath: {
			root: 'dist',
			html: './',
		},
	},
	tools: {
		cssExtract: {
			pluginOptions: {
				ignoreOrder: false,
			},
		},
		rspack: {
			ignoreWarnings: [/warning from compiler/, () => true],
		},
	},
});
