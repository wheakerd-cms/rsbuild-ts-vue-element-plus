<script lang="ts" setup>
import router from "@/app/admin/router";
import {Icon} from "@iconify/vue";

defineOptions({
	name: 'PermissionsButton',
});

const props = withDefaults(defineProps<{
	disableDelete: boolean;
}>(), {
	disableDelete: true,
});

const emits = defineEmits<{
	addButton: [],
	delButton: [],
}>();

const permissions: string [] = router.currentRoute.value?.meta?.permissions as string [] || [];

</script>
<template>
	<el-button v-if="permissions.includes('add')"
			   type="primary"
			   @click="emits('addButton')"
	>
		添加
		<template #icon>
			<icon icon="material-symbols-light:add"/>
		</template>
	</el-button>
	<el-button v-if="permissions.includes('delete')"
			   :disabled="props.disableDelete"
			   type="danger"
			   @click="emits('delButton')"
	>
		删除选中
		<template #icon>
			<icon icon="mdi:garbage-can-outline"/>
		</template>
	</el-button>
</template>