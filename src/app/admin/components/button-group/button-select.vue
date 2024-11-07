<script lang="ts" setup>
import {Icon} from "@iconify/vue";

defineOptions({
	name: 'SelectButton',
});

const props = withDefaults(defineProps<{
	showSelect: boolean,
}>(), {
	showSelect: true,
});

const emits = defineEmits<{
	selectClick: [];
	deselectClick: [];
}>();
</script>
<template>
	<el-button v-if="props.showSelect"
			   type="warning"
			   @click="emits('selectClick')"
	>
		全选
		<template #icon>
			<icon icon="fluent:select-all-on-16-filled"/>
		</template>
	</el-button>
	<el-button v-else
			   type="info"
			   @click="emits('deselectClick')"
	>取消选中
		<template #icon>
			<icon icon="tabler:deselect"/>
		</template>
	</el-button>
</template>