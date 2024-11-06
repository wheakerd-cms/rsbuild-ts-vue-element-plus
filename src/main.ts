import './style.scss';
import {App, createApp} from 'vue';
import AppElement from './App.vue';
import router from '@/router';
import {pinia} from '@/plugin/pinia.plugin.ts';
import ElementPlus from 'element-plus';

const app: App<Element> = createApp(AppElement);

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount('#root');