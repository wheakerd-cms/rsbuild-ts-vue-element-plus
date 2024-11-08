<script lang="ts" setup>
import {
	ElForm, ElTree, ElTreeSelect,
} from "element-plus";
import {onMounted, reactive, Ref, ref} from "vue";
import {ApiSelectMenu} from "@/app/admin/api/permissions/menu";
import {ApiRolesList, ApiSelectRoles} from "@/app/admin/api/permissions/roles";

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

const rules = reactive({
	name: [
		{required: true, trigger: 'change',},
	],
});

const menuSelect: Ref<Array<any>> = ref([]);
const rolesSelect: Ref<Array<any>> = ref([]);

const treeRef = ref<InstanceType<typeof ElTree>>()

const getCheckedNodes = () => {
	model.value.router = treeRef.value!.getCheckedKeys();
}

const loadSelectMenu = async () => {
	const res = await ApiSelectMenu();

	if (res) menuSelect.value = res.data || [];
};

const loadSelectRoles = async () => {
	const res = await ApiSelectRoles();

	if (res) rolesSelect.value = res.data || [];
};

onMounted(async () => {
	emits('register', formRef.value);
	await loadSelectRoles();
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
			<el-col :span="12">
				<el-form-item label="角色组名称" prop="name">
					<el-input v-model="model.name"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="归属角色组" prop="parentId">
					<el-tree-select v-model="model.parentId"
									:data="rolesSelect"
									:props="{
										label: 'name',
										value: 'id',
										children: 'children',
									}"
									clearable
									check-strictly
									default-expand-all
					/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="菜单分配" prop="router">
					<el-tree ref="treeRef"
							 :data="menuSelect"
							 node-key="id"
							 :props="{
								 label: 'title',
								 children: 'children',
							 }"
							 :default-checked-keys="model.router"
							 @check-change="getCheckedNodes"
							 show-checkbox
							 class="w-100"
					/>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>