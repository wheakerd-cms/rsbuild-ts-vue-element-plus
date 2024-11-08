<script lang="ts" setup>
import {useAppStore} from "@/app/admin/stores/app-store.ts";

defineOptions({
	name: 'TagViewLayout',
});

const appStore = useAppStore();
</script>
<template>
	<div>
		11
		<div v-for="([key, item]) in Object.entries(appStore.getCacheRoutes)">
			<router-link :to="item?.meta?.path">
				<div :key="key"
					 class="border border-1">{{ item?.meta?.title }}
				</div>
			</router-link>
		</div>
	</div>
</template>