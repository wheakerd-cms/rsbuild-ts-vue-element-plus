<script lang="ts" setup>
import {
	ElForm, ElTreeSelect,
} from "element-plus";
import {onMounted, reactive, Ref, ref} from "vue";
import {ApiSelectRoles} from "@/app/admin/api/permissions/roles";

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
	username: [
		{required: true, trigger: 'change',},
	],
	roleId: [
		{required: true, trigger: 'change',},
	],
});

const rolesSelect: Ref<Array<any>> = ref([]);

const loadSelectMenu = async () => {
	const res = await ApiSelectRoles();

	if (res) rolesSelect.value = res.data || [];
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
		<el-row justify="center">
			<el-col :span="24">
				<el-form-item label="账号" prop="username">
					<el-input v-model="model.username"/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row justify="center">
			<el-col :span="24">
				<el-form-item label="密码" prop="password">
					<el-input v-model="model.password"/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row justify="center">
			<el-col :span="24">
				<el-form-item label="角色组" prop="roleId">
					<el-tree-select v-model="model.roleId"
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
		</el-row>
		<el-row justify="center">
			<el-col :span="24">
				<el-form-item label="状态" prop="status">
					<el-input v-model="model.status"/>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>