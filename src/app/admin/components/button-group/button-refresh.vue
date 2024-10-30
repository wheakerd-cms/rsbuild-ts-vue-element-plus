<script lang="ts" setup>
defineOptions({
	name: 'RefreshButton',
});
const emits = defineEmits<{
	refreshClick: [],
}>();
</script>
<template>
	<el-button type="primary"
			   icon="item.icon"
			   @click="emits('refreshClick')"
	>刷新
	</el-button>
</template>