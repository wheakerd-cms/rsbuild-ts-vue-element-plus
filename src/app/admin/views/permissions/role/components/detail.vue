<script lang="ts" setup>

import {Icon} from "@iconify/vue";

const props = defineProps<{
	data: Record<string, any>,
}>();
</script>
<template>
	<div class="w-100 row g-0">
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">名称</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">{{ props.data.name }}</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">路由</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">{{ props.data.path }}</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">组件名</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">{{ props.data.name }}</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">组件</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">{{ props.data.component }}</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">图标</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">
				<icon :icon="props.data.icon"/>
			</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">状态</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">
				<el-tag v-if="props.data.status" type="success">开启</el-tag>
				<el-tag v-else type="danger">关闭</el-tag>
			</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">开发环境</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">
				<el-tag v-if="props.data.dev" type="success">是</el-tag>
				<el-tag v-else type="danger">否</el-tag>
			</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">固定标签</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">
				<el-tag v-if="props.data.fixed" type="success">是</el-tag>
				<el-tag v-else type="danger">否</el-tag>
			</div>
		</div>
		<div class="col-12 d-flex">
			<div class="col-2 border border-1 py-2 px-3 fw-bold text-center">排序</div>
			<div class="flex-grow-1 border border-1 py-2 px-3">{{ props.data.sort }}</div>
		</div>
	</div>
</template>