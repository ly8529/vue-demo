<template>
	<h1>account 页面</h1>
	<button @click="toLogin">toLogin</button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function toLogin() {
	router.push({
		path: '/login',
	})
}
</script>
