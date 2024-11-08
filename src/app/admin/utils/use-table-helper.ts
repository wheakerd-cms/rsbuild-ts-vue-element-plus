import {nextTick, Ref, ref} from "vue";
import {ElMessage, ElMessageBox, ElTable} from "element-plus";
import {unref} from "@vue/runtime-core";

export const useTableHelper = (config: {
	tableApi: () => Promise<{
		list: any [];
		total: number;
	}>;
	saveApi?: (data: any) => Promise<boolean>;
	deleteApi?: (ids: number []) => Promise<boolean>;
	updateApi?: (id: string, column: { [key: string]: any }) => Promise<boolean>;
}) => {
	const loading = ref(false);
	const currentPage = ref(1);
	const pageSize = ref(10);
	const total = ref(0);
	const pageSizes = ref([10, 30, 50, 100]);
	const ids = ref([]);

	const tableRef: Ref<InstanceType<typeof ElTable> | undefined> = ref();

	const tableData: Ref<any []> = ref([]);

	const tableRegister = (value: InstanceType<typeof ElTable> | undefined) => {
		tableRef.value = value;
	};

	const getTableRef = async () => {
		await nextTick();
		const table: InstanceType<typeof ElTable> | undefined = unref(tableRef.value);
		if (!table) {
			console.error('The table is not registered!');
		}
		return table;
	};

	const tableMethods = {
		getTableData: async (): Promise<void> => {
			const {tableApi} = config;

			loading.value = true;

			try {
				const res = await tableApi();
				console.log('tableApi res', res);
				if (res) {
					tableData.value = res.list;
					total.value = res.total;
				}
			} catch (err) {
				console.log('tableApi error', err);
			} finally {
				setTimeout(() => {
					loading.value = false;
				}, 618 / 1e1);
			}
		},
		refreshTableData: async (): Promise<void> => {
			await tableMethods.getTableData();
		},
		deleteTableData: async (ids: number []): Promise<void> => {
			const {deleteApi} = config;
			if (!deleteApi) {
				console.warn('deleteApi is undefined');
				return;
			}

			let res: boolean | undefined;

			ElMessageBox.confirm(
				'确定删除吗？',
				'确定',
				{
					distinguishCancelAndClose: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}
			).then(async () => {
				try {
					res = await deleteApi(ids);
					console.log('deleteApi res', res);
					if (res) {
						ElMessage({
							type: 'success',
							message: '操作成功',
						});
					}
					await tableMethods.refreshTableData();
				} catch (err) {
					console.log('deleteApi error');
				}
			});
		},
		updateTableColumn: async (id: string, column: string, value: any): Promise<boolean> => {
			const {updateApi} = config;
			if (!updateApi) {
				console.warn('updateApi is undefined');
				return false;
			}

			let res: boolean | undefined;

			try {
				const res: boolean = await updateApi(id, {[column]: value});
				console.log('updateApi res', res);

			} catch (err) {
				console.log('updateApi error');
			}

			return !!res;
		},
		saveFormData: async (data: any) => {
			const {saveApi} = config;

			if (!saveApi) {
				console.warn('saveApi is undefined');
				return false;
			}

			try {
				const res: boolean = await saveApi(data);
				console.log('saveApi res', res);
				await tableMethods.refreshTableData();
				return res;
			} catch (err) {
				console.log('saveApi error', err);
			}
		},
	};

	const handlers = {
		collectIdsHandler: async (): Promise<void> => {
			const tableRef: InstanceType<typeof ElTable> | undefined = await getTableRef();
			ids.value = tableRef?.getSelectionRows().map(
				(item: Record<string, any>) => item.id
			);
		},
	};

	const events = {
		selectAll: async () => {
			const tableRef = await getTableRef();
			tableRef?.toggleAllSelection();
		},
		deselectAll: async () => {
			const tableRef = await getTableRef();
			tableRef?.clearSelection();
			await handlers.collectIdsHandler();
		},
	};

	return {
		tableParams: {
			loading,
			currentPage,
			pageSize,
			total,
			pageSizes,
			ids,
			tableData,
		},
		tableRegister,
		tableMethods,
		handlers,
		events,
	};
};