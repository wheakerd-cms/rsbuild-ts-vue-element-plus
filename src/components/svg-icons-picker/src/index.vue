<script lang="tsx" setup>
import {onMounted, Ref, ref, watch} from "vue";
import {
	ElEmpty,
	ElConfigProvider,
	ElPopover,
	ElScrollbar,
	ElPagination,
} from "element-plus";
import {unref} from "@vue/runtime-core";
import SvgIconsList from './data';
import {Icon} from '@iconify/vue';
import zhCn from "element-plus/es/locale/lang/zh-cn";

defineOptions({
	name: 'SvgIconsPicker',
});

const model = defineModel({
	type: String,
	required: false,
	default: '',
});

const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => unref(popoverRef).popperRef?.delayHide?.();

const prefixList: Ref<Array<string>> = ref([]);
const iconsList: Ref<Array<string>> = ref([]);
const iconPrefix: Ref<string> = ref('');

const search: Ref<string> = ref('');

const total: Ref<number> = ref(0);
const currentPage: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(49);

function handler() {
	let searchLength = search.value.length;

	prefixList.value = [];
	iconsList.value = [];

	Object.entries(SvgIconsList).map(([prefix, items]) => {
		if (searchLength === 0) {
			prefixList.value.push(prefix);
			if (iconPrefix.value === prefix) iconsList.value = items.icons;
		} else {
			const regex = new RegExp(search.value, 'i');

			const icons = items.icons.filter(item => {
				const colonIndex = item.indexOf(':');
				if (colonIndex === -1) return false;
				const substringAfterColon = item.slice(colonIndex + 1);
				return regex.test(substringAfterColon);
			});

			if (icons.length > 0) {
				prefixList.value.push(prefix);
				if (iconPrefix.value === prefix) iconsList.value = icons;
			}
		}
	});

	total.value = iconsList.value.length;
	currentPage.value = 1;

	if (!prefixList.value.includes(iconPrefix.value)) {
		handSwitchIndex(prefixList.value [0]);
	}
}

const handSwitchIndex = (prefix: string) => {
	iconPrefix.value = prefix;
	handler();
};

const selectIcon = (value: string) => {
	model.value = value;
	unref(popoverRef)?.hide();
};

onMounted(() => {
	const [prefix] = Object.entries(SvgIconsList) [0];
	iconPrefix.value = prefix;
	handler();
});

watch(
	() => search.value,
	() => handler(),
);
// noinspection JSUnusedGlobalSymbols
const reader = () => <>
	<div class="d-flex h-100 ">
		<div ref={buttonRef}
			 onClick={onClickOutside}
			 class="d-flex justify-content-center align-items-center border border-1 w-100 h-100"
			 style={{
				 cursor: 'pointer',
				 padding: 5 + 'px',
			 }}
		>
			<Icon v-show={model.value}
				  icon={model.value}
				  width={16}
				  height={16}
			/>
		</div>
		<ElPopover ref={popoverRef}
				   virtual-ref={buttonRef}
				   trigger={'click'}
				   virtual-triggering
				   width={'auto'}
		>
			<div class="mb-2">
				<el-input v-model={search.value} size="default" placeholder="搜索图标"/>
			</div>
			<div class="d-flex justify-content-between" style={{
				width: 'auto',
				height: 250 + 'px',
			}}>
				<ElScrollbar viewClass="w-auto d-inline-flex">
					<div class="d-inline-flex flex-column">
						<div class="w-100 d-none"/>
						{
							prefixList.value.map(item => {
								return <>
									<div class={'w-auto m-0 text-center py-1 fw-bold text-hover text-hover'}
										 style={{
											 cursor: 'pointer',
											 color: iconPrefix.value === item ? '#1187eb' : '',
										 }}
										 onClick={() => handSwitchIndex(item)}
									>{item}</div>
								</>;
							})
						}
					</div>
				</ElScrollbar>
				<div class="d-block" style={{
					width: 252 + 'px',
					height: 252 + 'px',
				}}>
					{
						prefixList.value.length === 0
							? (<ElEmpty/>)
							: iconsList.value.map(
								(item, _i) => {
									if (
										_i >= (currentPage.value - 1) * pageSize.value
										&& _i < currentPage.value * pageSize.value
									) {
										return <>
											<div onClick={() => selectIcon(item)}
												 class="icon-hover"
												 style={{
													 width: 32 + 'px',
													 height: 32 + 'px',
													 padding: 5 + 'px',
													 border: 'solid 1px',
													 borderColor: '#dcdfe6',
													 margin: '0 4px 4px 0',
													 display: 'inline-flex',
													 justifyContent: 'center',
													 alignItems: 'center',
													 cursor: 'pointer',
												 }}
											>
												<Icon icon={item} width={16} height={16}/>
											</div>
										</>;
									}
								}
							)
					}
				</div>
			</div>
			<div class="mt-2">
				<ElConfigProvider locale={zhCn}>
					<ElPagination size={'small'}
								  currentPage={currentPage.value}
								  pageSize={pageSize.value}
								  onUpdate:current-page={(value: number) => {
									  currentPage.value = value;
								  }}
								  onUpdate:page-size={(value: number) => {
									  pageSize.value = value;
								  }}
								  layout="total, prev, pager, next, jumper"
								  total={total.value}
								  onCurrent-change={(value) => console.log(typeof value)}
					/>
				</ElConfigProvider>
			</div>
		</ElPopover>
	</div>
</>;
</script>
<template>
	<component :is="reader"/>
</template>
<style lang="css">
.text-hover:hover {
	color: #1187eb;
}

.icon-hover:hover {
	border-color: #1187eb !important;
}
</style>