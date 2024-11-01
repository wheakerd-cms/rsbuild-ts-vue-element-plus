import './style.scss';
import {App, createApp} from 'vue';
import AppElement from './App.vue';
import router from '@/router';
import {pinia} from '@/plugin/pinia.plugin.ts';
import ElementPlus from 'element-plus';
import {addAPIProvider} from "@iconify/vue";

const app: App<Element> = createApp(AppElement);

app.use(pinia);
app.use(router);
app.use(ElementPlus);

addAPIProvider('local', {
	resources: [
		import.meta.env.PUBLIC_ICONITY_BASEURL,
	],
});

app.mount('#root');