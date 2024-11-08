<script lang="ts" setup>
import {computed, ref, type Ref} from "vue";
import {useRouterStoreWithout} from "@/app/admin/stores/router-store";
import HeaderLayout from "@/app/admin/components/layout/HeaderLayout.vue";
import MenuLayout from "@/app/admin/components/layout/MenuLayout.vue";
import {useAppStore} from "@/app/admin/stores/app-store.ts";
import TagViewLayout from "@/app/admin/components/layout/TagViewLayout.vue";

const {getAddRouters} = useRouterStoreWithout();
const appStore = useAppStore();

const datasource: Ref = ref(getAddRouters as []);

const redirectRouter = async (route: Record<string, any>) => {
	await appStore.setCacheRoutes(route);
};

const cachePagesKeys = computed(() => {
	return appStore.getCacheRoutesKeys;
});
</script>
<template>
	<el-container class="vw-100 vh-100 overflow-hidden">
		<el-aside width="220px"
				  style="background-color: #001529"
				  class="overflow-hidden"
		>
			<div :style="{
						height: 52 + 'px',
						backgroundColor: '#001529',
				 	}"
				 class="d-flex align-items-center justify-content-center text-white position-sticky top-0 z-1"
			>
				<img src="@/assets/admin/svg/logo.svg"
					 style="width: 32px;"
					 alt="logo"
				/>
				<span class="ms-2">后台管理系统</span>
			</div>
			<el-scrollbar>
				<MenuLayout :style="{
								   	backgroundColor: '#001529',
						   			'--el-menu-text-color': '#FFFFFF',
				 					'--el-menu-hover-text-color': '#FFFFFF',
				  					'--el-menu-bg-color': '#0F2438',
				   					'--el-menu-hover-bg-color': '#073d68',
				    				'--el-menu-active-color': '#FFD04B',
				      				// '--el-menu-item-bg-color': '#0F2438',
						   	   }"
							:datasource="datasource"
							@on-item-click="redirectRouter"
							class-name="h-100 border-0 text-white"
				/>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header class="h-auto px-0">
				<HeaderLayout/>
				<TagViewLayout/>
			</el-header>
			<el-main id="main" class="rounded-1 border bg-white h-100 m-3 p-3">
				<div class="w-100 h-100">
					<RouterView v-slot="{Component, route}">
						<KeepAlive :include="cachePagesKeys" :max="10">
							<Component :key="route.fullPath" :is="Component"/>
						</KeepAlive>
					</RouterView>
				</div>
			</el-main>
			<el-footer></el-footer>
		</el-container>
	</el-container>
</template>