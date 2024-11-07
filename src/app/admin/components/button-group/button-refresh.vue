<script lang="ts" setup>
import {Icon} from "@iconify/vue";

defineOptions({
	name: 'RefreshButton',
});
const emits = defineEmits<{
	refreshClick: [],
}>();
</script>
<template>
	<el-button type="primary"
			   @click="emits('refreshClick')"
	>刷新
		<template #icon>
			<icon icon="tabler:refresh"/>
		</template>
	</el-button>
</template>