<script lang="tsx" setup>
import {ref} from "vue";
import {
	ElInput,
	ElButton,
	ElPopover,
	ElScrollbar,
} from "element-plus";
import {unref} from "@vue/runtime-core";
import SvgIcon from '@/components/svg-icon';
import SvgIconsList from './data';

defineOptions({
	name: 'SvgIconsPicker',
});

console.log(
	SvgIconsList
)

const model = defineModel({
	type: String,
	required: false,
	default: '',
});

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
	console.log(unref(popoverRef).popperRef)
	unref(popoverRef).popperRef?.delayHide?.()
}

// noinspection JSUnusedGlobalSymbols
const reader = () => <>
	<div class="d-flex w-100 h-100 align-items-stretch">
		<ElInput v-model={model.value}

				 disabled={true}
				 class="d-none"
		/>
		<div class="flex-grow-1 border"
			 style={{
				 backgroundColor: '#f5f7fa',
				 cursor: 'not-allowed',
			 }}>
			<SvgIcon v-show={!model.value} icon={model.value}/>
		</div>
		<div ref={buttonRef}
			 onClick={onClickOutside}
			 class="d-flex border border-1"
			 style={{
				 width: 25 + 'px',
				 cursor: 'pointer',
			 }}
		/>
		<ElPopover ref={popoverRef}
				   virtual-ref={buttonRef}
				   trigger={'click'}
				   virtual-triggering
				   width={450}
		>
			<div>
				<div style={{
					width: 'auto',
					height: 380 + 'px',
				}}>
					<ElScrollbar viewClass="w-auto" viewStyle={{width: 'auto',}}>
						<div class="d-inline-flex flex-column">
							<ElButton class="w-100 d-none"/>
							{
								Object.entries(SvgIconsList).map(([key, item]) => {

									return <>
										<ElButton class="w-100">{key}</ElButton>
									</>;
								})
							}

						</div>
					</ElScrollbar>
				</div>
			</div>
		</ElPopover>
	</div>
</>;
</script>
<template>
	<component :is="reader"/>
</template>
<style scoped></style>