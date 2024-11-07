<script lang="ts" setup>
import PermissionsButton from "@/app/admin/components/button-group/button-permissions.vue";
import SelectButton from "@/app/admin/components/button-group/button-select.vue";
import Table from "./components/table.vue";
import {useTableHelper} from "@/app/admin/utils/use-table-helper.ts";
import {ApiDelete, ApiSave, ApiTable} from "@/app/admin/api/permissions/menu";
import {onMounted, Ref, ref} from "vue";
import {unref} from "@vue/runtime-core";
import RefreshButton from "@/app/admin/components/button-group/button-refresh.vue";
import AdminDialog from "@/app/admin/components/element-plus/dialog.vue";
import Save from "./components/save.vue";
import Detail from "./components/detail.vue";
import {useFormHelper} from "@/app/admin/utils/use-form-helper.ts";
import {ElMessage} from "element-plus";
import {ApiRoutes} from "@/app/admin/api/index/login";
import type {RouteRecordRaw} from "vue-router";
import router from "@/router";
import {useRouterStoreWithout} from "@/app/admin/stores/router-store.ts";

const {tableParams, tableRegister, tableMethods, handlers, events} = useTableHelper({
	tableApi: async () => {
		const {currentPage, pageSize} = tableParams;

		const res = await ApiTable({
			currentPage: unref(currentPage),
			pageSize: unref(pageSize),
		});

		return {
			list: res?.data?.list || [],
			total: res?.data?.total || 0,
		};
	},
	deleteApi: async (ids: Array<number>) => {
		const res = await ApiDelete(ids);

		return !!res;
	},
	saveApi: async (data: any) => {
		const res = await ApiSave(data);

		if (!!res) await loadRoutes();

		return !!res;
	},
});

const loadRoutes = async () => {
	const res = await ApiRoutes();

	if (res) {
		const {data} = res;
		const routerStore = useRouterStoreWithout();

		routerStore.setAddRouters(data as RouteRecordRaw []);
		await routerStore.generateRoutes();

		routerStore.getRouters.forEach((route: RouteRecordRaw) => {
			console.log(route)
			router.addRoute(route);
		});
		routerStore.setIsAddRouters(true);
	}
};

const {ids, loading, tableData} = tableParams;
const {getTableData, refreshTableData, deleteTableData, saveFormData} = tableMethods;
const {collectIdsHandler} = handlers;
const {selectAll, deselectAll} = events;

const {formParams, formRegister, setDefaultFromData, formMethods} = useFormHelper();
const {formData} = formParams;
const {getFormData, resetFormData} = formMethods;

setDefaultFromData({
	type: 0,
	parentId: null,
	title: '',
	path: '',
	name: '',
	component: '',
	icon: '',
	dev: false,
	fixed: false,
	status: true,
	sort: 0,
});

const dialogVisible: Ref<boolean> = ref(false);
const dialogAction: Ref<string> = ref('');
const dialogTitle: Ref<string> = ref('');

const AddActionHandler = () => {
	dialogAction.value = 'add';
	dialogTitle.value = '新增';
	resetFormData();
	dialogVisible.value = true;
};

const EditActionHandler = (scope: Record<string, any>) => {
	dialogAction.value = 'edit';
	dialogTitle.value = '编辑';
	formData.value = scope.row;
	dialogVisible.value = true;
};

const DetailActionHandler = (scope: Record<string, any>) => {
	dialogAction.value = 'detail';
	dialogTitle.value = '详情';
	formData.value = scope.row;
	dialogVisible.value = true;
};

const DelActionHandler = async (scope?: Record<string, any>) => {
	const idArr = scope?.row?.id ? [scope.row.id] : ids.value;
	await deleteTableData(idArr);
};

const saveActionHandler = async () => {
	const data = await getFormData();
	if (data) {
		const res = await saveFormData(formData.value);

		if (res) {
			dialogVisible.value = false;
			ElMessage({
				type: 'success',
				message: 'success',
			});
			await tableMethods.refreshTableData();
		}
	}
};

onMounted(() => {
	getTableData();
});
</script>
<template>
	<div>
		<div class="mb-3">
			<PermissionsButton :disable-delete="!ids.length"
							   @add-button="AddActionHandler"
							   @del-button="DelActionHandler"
			/>
			<SelectButton :show-select="!ids.length"
						  @select-click="selectAll"
						  @deselect-click="deselectAll"
			/>
			<RefreshButton @refresh-click="refreshTableData"/>
		</div>
		<Table v-model:data="tableData"
			   :loading="loading"
			   @register="tableRegister"
			   @select="collectIdsHandler"
			   @edit-event="EditActionHandler"
			   @detail-event="DetailActionHandler"
			   @delete-event="DelActionHandler"
		/>
		<AdminDialog v-model="dialogVisible"
					 :title="dialogTitle"
		>
			<Save v-if="['add', 'edit'].includes(dialogAction)"
				  v-model="formData"
				  @register="formRegister"
			/>
			<Detail v-if="'detail' === dialogAction"
					:data="formData as Record<string,any>"
			/>
			<template #footer>
				<div class="d-flex justify-content-end">
					<template v-if="['add', 'edit'].includes(dialogAction)">
						<el-button @click="dialogVisible = false" type="info">取消</el-button>
						<el-button @click="saveActionHandler" type="primary">确定</el-button>
					</template>
					<template v-else>
						<el-button @click="dialogVisible = false" type="info">关闭</el-button>
					</template>
				</div>
			</template>
		</AdminDialog>
	</div>
</template>