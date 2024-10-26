/// <reference types="@rsbuild/core/types" />

declare module '*.vue' {
	import Vue from 'vue';

	export default Vue;
}

interface ImportMetaEnv {
	// import.meta.env.PUBLIC_ROUTER_MODE
	readonly PUBLIC_ROUTER_MODE: 'host' | 'web';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}