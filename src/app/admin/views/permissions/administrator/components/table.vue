<script lang="ts" setup>
import {ElTable, ElTableColumn} from "element-plus";
import {onMounted, Ref, ref} from "vue";

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
		<el-table-column prop="username" label="账号"/>
		<el-table-column prop="roles.name" label="角色组"/>
		<el-table-column prop="status" label="状态">
			<template #default="scope">
				<el-tag v-if="scope.row.status" type="success">正常</el-tag>
				<el-tag v-else type="danger">禁用</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="createTime" label="创建时间"/>
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