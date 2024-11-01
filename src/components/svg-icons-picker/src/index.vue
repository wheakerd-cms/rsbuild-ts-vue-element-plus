<script lang="tsx" setup>
import {Ref, ref} from "vue";
import {
	ElInput,
	ElPopover,
} from "element-plus";
import {unref} from "@vue/runtime-core";
import SvgIcon from '@/components/svg-icon';

defineOptions({
	name: 'SvgIconsPicker',
});

const model = defineModel({
	type: String,
	required: false,
	default: '',
});

const inputRef: Ref<InstanceType<typeof ElInput> | undefined> = ref();

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
	unref(popoverRef).popperRef?.delayHide?.()
}

// noinspection JSUnusedGlobalSymbols
const reader = () => <>
	<div class="d-flex w-100 h-100 align-items-stretch">
		<ElInput v-model={model.value}
				 ref={inputRef}
				 disabled={true}
				 class="d-none"
		/>
		<div class="flex-grow-1 border" style={{
			cursor: 'not-allowed'
		}}>
			<SvgIcon v-show={!model.value} icon={model.value}/>
		</div>
		<div class="d-flex border border-1"
			 onFocus={onClickOutside}
			 style={{
				 width: 25 + 'px',
				 cursor: 'pointer',
			 }}
		/>
		<ElPopover
			ref={popoverRef}
			virtual-ref={buttonRef}
			trigger={'click'}
			title={'With title'}
			virtual-triggering
		>
			<span>Some content</span>
		</ElPopover>
	</div>
</>;
</script>
<template>
	<component :is="reader"/>
</template>
<style scoped></style>