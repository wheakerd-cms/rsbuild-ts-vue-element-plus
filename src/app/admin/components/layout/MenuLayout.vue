<script lang="tsx" setup>
import {
	ElIcon,
	ElMenu,
	ElSubMenu,
	ElMenuItem,
} from "element-plus";
import type {RouteRecordRaw} from "vue-router";
import {Icon} from '@iconify/vue';

defineOptions({
	name: "MenuLayout",
});

const props = defineProps<{
	className: String,
	style: Object,
	datasource: RouteRecordRaw [],
}>();

const renderMenuItem = (datasource: RouteRecordRaw []) => (
	<>
		{
			datasource.map((item: RouteRecordRaw): any => {
				if (!!item.children) {
					return templateRender(item.children as unknown as RouteRecordRaw []);
				} else {
					return (
						<>
							<ElMenuItem index={item.name as string}
										onClick={handleItemClick}
										v-slots={{
											'title': () => <>
												{
													!!item?.meta?.icon ?
														<ElIcon v-slots={{
															default: () => <Icon icon={item?.meta?.icon as string}/>,
														}}/>
														: null
												}
												<span>{item?.meta?.title}</span>
											</>,
										}}
							/>
						</>
					);
				}
			})
		}
	</>
);

const templateRender = (datasource: RouteRecordRaw []) => (
	<>
		{
			datasource.map((item: RouteRecordRaw): any => {
				if (!!item.children) {
					return <>
						<ElSubMenu index={item.name as string} v-slots={{
							'title': () => <>
								{
									!!item?.meta?.icon
										? (<ElIcon v-slots={{
											default: () => <Icon icon={item?.meta?.icon as string}/>,
										}}/>)
										: null
								}
								<span>{item?.meta?.title}</span>
							</>,
							'default': () => renderMenuItem(item.children as unknown as RouteRecordRaw []),
						}}/>
					</>;
				} else {
					return renderMenuItem(item.children as unknown as RouteRecordRaw []);
				}
			})
		}
	</>
);

const emit = defineEmits<{
	(e: 'on-item-click', path: string): void;
}>();

const handleItemClick = (item: any) => {
	emit('on-item-click', item.index);
};
</script>
<template>
	<ElMenu class="el-menu-vertical-demo"
			:class="props.className"
			:style="style"
			default-active="2"
	>
		<Component :is="templateRender (props.datasource)"/>
	</ElMenu>
</template>