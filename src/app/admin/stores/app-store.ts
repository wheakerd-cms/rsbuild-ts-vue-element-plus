import {defineStore} from "pinia";
import {computed, Reactive, reactive, Ref, ref} from "vue";
import router from "@/app/admin/router";

export const useAppStore = defineStore('admin.app', () => {
	const cacheRoutes: Reactive<Record<string, Record<string, any>>> = reactive({});

	const setCacheRoutes = async (route: Record<string, any>) => {
		const {name} = route;
		const fullpath: string = router.resolve({name}).fullPath;
		await router.push(fullpath);

		if (!Object.keys(cacheRoutes).includes(name)) {
			cacheRoutes [name] = route;
		}

	};
	const getCacheRoutes = computed(() => cacheRoutes);
	const getCacheRoutesKeys = computed(() => Object.keys(cacheRoutes));
	const getCacheRoutesValue = (fullpath: string) => computed(() => cacheRoutes [fullpath]);

	const theme: Ref<string> = ref('light');
	const getTheme = computed(() => theme.value);
	const setTheme = (value: string): void => {
		theme.value = value;
	};

	return {
		cacheRoutes,
		setCacheRoutes,
		getCacheRoutes,
		getCacheRoutesKeys,
		getCacheRoutesValue,

		theme,
		getTheme,
		setTheme,
	};
}, {
	persist: {
		key: 'admin.app',
		pick: [],
	},
});