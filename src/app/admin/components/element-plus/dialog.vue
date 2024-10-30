<script lang="ts" setup>
import {Icon} from "@iconify/vue";

defineOptions({
	name: 'AdminDialog',
});

const props = defineProps<{
	title: string;
	event?: string;
	width?: '500 px';
}>();

const modelValue = defineModel({
	type: Boolean,
	required: true,
});
</script>
<template>
	<el-dialog
		v-model="modelValue"
		:width="props.width"
		align-center
		destroy-on-close
		draggable
		:append-to-body="false"
		:show-close="false"
		:close-on-click-modal="false"
	>
		<template #header>
			<div class="d-flex justify-content-between mx-2 mt-2">
				<span>{{ props.title }}</span>
				<div>
					<icon icon="material-symbols-light:close"
						  :width="20"
						  style="cursor: pointer"
						  @click="modelValue=false"
					/>
				</div>
			</div>
			<el-divider class="my-2"/>
		</template>
		<template #default>
			<div ref="defaultSlotRef"
				 class="w-100 d-flex justify-content-center px-3"
			>
				<slot/>
			</div>
		</template>
		<template #footer>
			<el-divider class="my-2"/>
			<slot name="footer"/>
		</template>
	</el-dialog>
</template>