<script lang="ts" setup>
const props = defineProps<{
	data: Record<string, any>,
}>();
</script>
<template>
	<div class="w-100 row g-0">
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center text-nowrap">名称</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">{{ props.data.name }}</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center text-nowrap">创建时间</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">{{ props.data.createTime }}</div>
		</div>
	</div>
</template>