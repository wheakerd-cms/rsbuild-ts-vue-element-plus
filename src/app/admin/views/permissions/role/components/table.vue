<script lang="ts" setup>
import {ElTable, ElTableColumn} from "element-plus";
import {onMounted, Ref, ref} from "vue";
import {Icon} from "@iconify/vue";

const props = withDefaults(defineProps<{
	rowKey?: string;
	loading?: boolean;
	hasSelection?: boolean;
	operate?: true;
}>(), {
	rowKey: 'id',
	loading: false,
	hasSelection: true,
	operate: true,
});

const data = defineModel('data', {
	type: Array<any>,
	required: true,
	default: [],
});

const tableRef: Ref<InstanceType<typeof ElTable> | undefined> = ref();

const emits = defineEmits<{
	editEvent: [scope: Record<string, any>];
	detailEvent: [scope: Record<string, any>];
	deleteEvent: [scope: Record<string, any>];
	select: [];
	register: [value: InstanceType<typeof ElTable> | undefined];
}>();

const editClickEvent = (scope: Record<string, any>) => {
	emits('editEvent', scope);
};
const detailClickEvent = (scope: Record<string, any>) => {
	emits('detailEvent', scope);
};
const deleteClickEvent = (scope: Record<string, any>) => {
	emits('deleteEvent', scope);
};

onMounted(() => {
	emits('register', tableRef.value);
});

</script>
<template>
	<el-table ref="tableRef"
			  :data="data"
			  :row-key="props.rowKey"
			  v-loading="props.loading"
			  style="width: 100%"
			  table-layout="auto"
			  border
			  stripe
			  default-expand-all
			  show-overflow-tooltip
			  scrollbar-always-on
			  @select="emits('select')"
			  @select-all="emits('select')"
			  @selection-change="emits('select')"
	>
		<el-table-column v-if="props.hasSelection" fixed="left" type="selection"/>
		<el-table-column prop="title" label="名称"/>
		<el-table-column prop="icon" label="图标" width="55" align="center">
			<template #default="scope">
				<Icon :icon="scope.row.icon"/>
			</template>
		</el-table-column>
		<el-table-column prop="permissions" label="权限">
			<template #default="scope">
				<template v-for="item in scope.row.permissions">
					<el-tag v-if="item === 'add'" class="mx-1" type="primary" size="small">新增</el-tag>
					<el-tag v-else-if="item === 'edit'" class="mx-1" type="success" size="small">编辑</el-tag>
					<el-tag v-else-if="item === 'delete'" class="mx-1" type="danger" size="small">删除</el-tag>
				</template>
			</template>
		</el-table-column>
		<el-table-column prop="path" label="路由"/>
		<el-table-column prop="name" label="组件名"/>
		<el-table-column prop="fixed" label="固定栏" align="center">
			<template #default="scope">
				<el-tag v-if="scope.row.fixed === true" type="success">是</el-tag>
				<el-tag v-else type="danger">否</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="status" label="状态" align="center">
			<template #default="scope">
				<el-tag v-if="scope.row.status === true" type="success">开启</el-tag>
				<el-tag v-else type="danger">关闭</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="sort" label="排序" align="center"/>
		<el-table-column v-if="props.operate"
						 fixed="right"
						 label="操作"
						 :show-overflow-tooltip="false"
		>
			<template #default="scope">
				<div class="d-flex">
					<el-button type="primary" @click="editClickEvent(scope)">编辑</el-button>
					<el-button type="success" @click="detailClickEvent(scope)">详情</el-button>
					<el-button type="danger" @click="deleteClickEvent(scope)">删除</el-button>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>