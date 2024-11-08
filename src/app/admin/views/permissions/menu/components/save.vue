<script lang="ts" setup>
import {
	ElForm,
	ElTreeSelect,
} from "element-plus";
import {onMounted, Reactive, reactive, Ref, ref} from "vue";
import SvgIconsPicker from "@/components/svg-icons-picker";
import {ApiSelectMenu} from "@/app/admin/api/permissions/menu";

defineOptions({
	name: 'Save',
});

const model = defineModel({
	type: Object,
	required: true,
});

const emits = defineEmits<{
	register: [value: InstanceType<typeof ElForm> | undefined],
}>();

const formRef: Ref<InstanceType<typeof ElForm> | undefined> = ref();

const rules: Reactive<Record<string, any>> = reactive({
	type: [
		{required: true, trigger: 'change',},
	],
	title: [
		{required: true, trigger: 'change',},
	],
	path: [
		{required: true, trigger: 'change',},
	],
	name: [
		{required: true, trigger: 'change',},
	],
	icon: [
		{required: true, trigger: 'change',},
	],
	status: [
		{required: true, trigger: 'change',},
	],
	dev: [
		{required: true, trigger: 'change',},
	],
	fixed: [
		{required: true, trigger: 'change',},
	],
	sort: [
		{required: true, trigger: 'change',},
	],
});

const parentSelect: Ref<Array<any>> = ref([]);

const MenuTypeClick = (value: number) => {
	if (value === 0) {
		rules ['component'] = [
			{required: true, trigger: 'change',},
		];
		model.value.component = '#';
	} else {
		delete rules.component;
		model.value.component = '';
	}
};

const loadSelectMenu = async () => {
	const res = await ApiSelectMenu();

	if (res) parentSelect.value = res.data || [];
};

onMounted(async () => {
	emits('register', formRef.value);
	await loadSelectMenu();
});
</script>
<template>
	<el-form ref="formRef"
			 :model="model"
			 :rules="rules"
			 label-position='right'
			 label-width="auto"
			 class="w-100"
	>
		<el-row>
			<el-col :span="24">
				<el-form-item label="菜单类型" prop="type">
					<el-radio-group v-model="model.type">
						<el-radio-button label="目录"
										 :value=0
										 @click="MenuTypeClick(0)"
						></el-radio-button>
						<el-radio-button label="菜单"
										 :value=1
										 @click="MenuTypeClick(1)"
						></el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="父级菜单" prop="parentId">
					<el-tree-select v-model="model.parentId"
									:data="parentSelect"
									:props="{
										label: 'title',
										value: 'id',
										children: 'children',
									}"
									clearable
									check-strictly
									default-expand-all
									placeholder="顶级目录无需选择"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="model.title"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="组件名称" prop="name">
					<el-input v-model="model.name"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="组件路径" prop="component">
					<el-input v-model="model.component"
							  :disabled="model.type === 0"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="路由地址" prop="path">
					<el-input v-model="model.path"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="图标" prop="icon">
					<div class="d-flex">
						<el-input v-model="model.icon" disabled/>
						<div class="flex-shrink-1" style="width: 32px;">
							<svg-icons-picker v-model="model.icon"/>
						</div>
					</div>
				</el-form-item>
			</el-col>
			<el-col :span="24" v-if="model.type === 1">
				<el-form-item label="操作权限" prop="permissions">
					<el-checkbox-group v-model="model.permissions">
						<el-checkbox label="新增" value="add"/>
						<el-checkbox label="编辑" value="edit"/>
						<el-checkbox label="删除" value="delete"/>
					</el-checkbox-group>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="状态" prop="status">
					<el-switch v-model="model.status"/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="是否开发环境" prop="dev">
					<el-switch v-model="model.dev"/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="是否固定标签" prop="fixed">
					<el-switch v-model="model.fixed"/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="排序" prop="sort">
					<el-input-number v-model="model.sort"
									 :min="0"
									 :step="1"
									 step-strictly
									 controls-position="right"
					/>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>