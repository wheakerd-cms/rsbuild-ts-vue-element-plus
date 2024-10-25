<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";

defineOptions({
	name: 'Typewriter',
});

const contentRef: Ref<HTMLDivElement | null> = ref(null);

const load = () => {
	const contentDiv = contentRef.value;

	if (!contentDiv) return;
	const str = contentDiv.innerHTML.toString();
	contentDiv.innerHTML = '';

	let i = 0;
	const interval = setInterval(() => {
		contentDiv.innerHTML = str.slice(0, ++i) + (i < str.length ? '|' : '');
		if (i === str.length) clearInterval(interval);
	}, 10);
};

onMounted(() => load());
</script>
<template>
	<main class="vh-100 vw-100">
		<h1>403</h1>
		<div class="body-content" ref="contentRef">
			<p>&gt; <span>ERROR CODE</span>: "<i>HTTP 403 Forbidden</i>"</p>
			<p>&gt; <span>ERROR DESCRIPTION</span>: "<i>Access Denied. You Do Not Have The Permission To Access This
				Page On
				This Server</i>"</p>
			<p>&gt; <span>ERROR POSSIBLY CAUSED BY</span>: [<b>execute access forbidden, read access forbidden, write
				access
				forbidden, ssl required, ssl 128 required, ip address rejected, client certificate required, site access
				denied, too many users, invalid configuration, password change, mapper denied access, client certificate
				revoked, directory listing denied, client access licenses exceeded, client certificate is untrusted or
				invalid, client certificate has expired or is not yet valid, passport logon failed, source access
				denied,
				infinite depth is denied, too many requests from the same client ip</b>...]</p>
			<p>&gt; <span>SOME PAGES ON THIS SERVER THAT YOU DO HAVE PERMISSION TO ACCESS : </span>
				<a href="/">Home Page</a>
			</p>
			<p>&gt; <span>HAVE A NICE DAY :-)</span></p>
		</div>
	</main>
</template>
<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono|Montserrat:700");

* {
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	vertical-align: baseline;
	box-sizing: border-box;
	color: inherit;
}

main {
	background-image: linear-gradient(120deg, #4f0088 0%, #000000 100%);
}

h1 {
	font-size: 45vw;
	text-align: center;
	position: fixed;
	width: 100vw;
	z-index: 1;
	color: #ffffff26;
	text-shadow: 0 0 50px rgba(0, 0, 0, 0.07);
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	font-family: "Montserrat", monospace;
}

.body-content {
	background: rgba(0, 0, 0, 0);
	width: 70vw;
	position: relative;
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 30px 30px 10px;
	box-shadow: 0 0 150px -20px rgba(0, 0, 0, 0.5);
	z-index: 3;
}

P {
	font-family: "Share Tech Mono", monospace;
	color: #f5f5f5;
	margin: 0 0 20px;
	font-size: 17px;
	line-height: 1.2;
}

span {
	color: #f0c674;
}

i {
	color: #8abeb7;
}

.body-content a {
	text-decoration: none;
}

b {
	color: #81a2be;
}

@-webkit-keyframes slide {
	from {
		right: -100px;
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
		opacity: 0;
	}
	to {
		right: 15px;
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		opacity: 1;
	}
}

@keyframes slide {
	from {
		right: -100px;
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
		opacity: 0;
	}
	to {
		right: 15px;
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		opacity: 1;
	}
}
</style>