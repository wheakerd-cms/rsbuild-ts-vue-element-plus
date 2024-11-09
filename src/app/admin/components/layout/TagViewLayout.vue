<script lang="ts" setup>
import {useAppStore} from "@/app/admin/stores/app-store.ts";
import {Icon} from "@iconify/vue";

defineOptions({
	name: 'TagViewLayout',
});

const appStore = useAppStore();
</script>
<template>
	<div class="d-flex">
		<div v-for="([_, item]) in Object.entries(appStore.getCacheRoutes)">
			<el-tag closable>
				<router-link :to="item?.meta?.path"
							 class="text-decoration-none d-flex"
				>
					<icon :icon="item?.meta?.icon"/>
					<div>{{ item?.meta?.title }}</div>
				</router-link>
			</el-tag>
		</div>
	</div>
</template>