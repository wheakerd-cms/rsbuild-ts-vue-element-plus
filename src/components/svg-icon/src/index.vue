<script lang="tsx" setup>
import {Icon} from '@iconify/vue';
// import IconsList from './data';

defineOptions({
	name: 'SvgIcon',
});

const props = defineProps<{
	icon: string;
}>();

const reader = () => <Icon icon={'@local' + ':' + props.icon}/>;

</script>
<template>
	<component :is="reader"/>
</template>