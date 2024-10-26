<script lang="ts" setup>
import {onMounted, ref} from 'vue';

defineOptions({
	name: 'CanvasBackground',
});


const divRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const texts = '0123456789'.split('');
const fontSize = 12;
let ctx: CanvasRenderingContext2D | null = null;

onMounted(() => {
	if (!canvasRef.value || !divRef.value) return;

	const canvas = canvasRef.value;
	ctx = canvas.getContext('2d');

	if (!ctx) return;

	canvas.height = divRef.value.clientHeight;
	canvas.width = divRef.value.clientWidth;

	const columns = Math.floor(canvas.width / fontSize);
	const drops = Array(columns).fill(1);

	const drawCanvas = () => {
		if (!ctx || !canvasRef.value) return;

		ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = '#0F0';
		ctx.font = `${fontSize}px Arial`;

		for (let i = 0; i < drops.length; i++) {
			const text = texts[Math.floor(Math.random() * texts.length)];
			ctx.fillText(text, i * fontSize, drops[i] * fontSize);

			if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
				drops[i] = 0;
			}
			drops[i]++;
		}
	};

	setInterval(drawCanvas, 33);

});
</script>

<template>
	<div ref="divRef" class="w-100 h-100">
		<canvas ref="canvasRef" class="bg-dark"></canvas>
	</div>
</template>