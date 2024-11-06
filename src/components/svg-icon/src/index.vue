<script lang="tsx" setup>
import {Icon} from '@iconify/vue';

defineOptions({
	name: 'SvgIcon',
});

const props = defineProps<{
	icon: string;
}>();

const reader = () => <Icon icon={props.icon}/>;

</script>
<template>
	<component :is="reader"/>
</template>