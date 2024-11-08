<script setup lang="ts">
import {Icon} from "@iconify/vue";

defineOptions({
	name: "HeaderLayout",
});

</script>
<template>
	<div class="py-2 border-bottom px-1 d-flex justify-content-between">
		<div class="">
			<el-icon>
				<icon icon="icon-park-solid:menu-fold-one"/>
			</el-icon>
			<!--			<ElIconFold style="width: 18px"/>-->
			<!--			<ElIconExpand style="width: 18px"/>-->
		</div>
		<div class="">
			<!--			<ElIconFold style="width: 18px"/>-->
			<!--			<ElIconExpand style="width: 18px"/>-->
		</div>
	</div>
</template>