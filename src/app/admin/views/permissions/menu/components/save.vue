<script lang="ts" setup>
import {ElForm} from "element-plus";
import {onMounted, reactive, Ref, ref} from "vue";

defineOptions({
	name: 'Save',
});

const model = defineModel({
	type: Object,
	required: true,
});

console.log(
	model.value
);

const emits = defineEmits<{
	register: [value: InstanceType<typeof ElForm> | undefined],
}>();

const formRef: Ref<InstanceType<typeof ElForm> | undefined> = ref();

const rules = reactive({
	type: [
		{required: true, trigger: 'change',},
	],
	name: [
		{required: true, trigger: 'change',},
	],
	path: [
		{required: true, trigger: 'change',},
	],
	componentName: [
		{required: true, trigger: 'change',},
	],
	component: [
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

const parentSelectId = ref(null);

const parentSelect: Ref<Array<any>> = ref([]);

const MenuTypeClick = (value: number) => {
	model.value.component = value === 0 ? '#' : '';
};

onMounted(() => {
	emits('register', formRef.value);
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
					<el-tree-select v-model="parentSelectId"
									:data="parentSelect"
									:props="{
										label: 'name',
										value: 'id',
										children: 'children',
									}"
									check-strictly
									default-expand-all
									placeholder="顶级目录无需选择"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="model.name"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="组件名称" prop="componentName">
					<el-input v-model="model.componentName"/>
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
					<el-input v-model="model.icon"
					>
						<template ></template>
					</el-input>
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