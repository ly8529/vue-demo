<template>
	<h1>login 页面</h1>
	<button @click="toAccount">toAccount</button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function toAccount() {
	router.push({
		path: '/account',
	})
}
</script>
