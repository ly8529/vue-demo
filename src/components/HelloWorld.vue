<template>
	<h1>hello 小可爱！</h1>
	<router-link type="button" to="/login">去登录页面</router-link>
	<br />
	<router-link to="/account">去用户页面</router-link>
	<div>Current Count: {{ counter.count }}</div>
	<button @click="addBtn">add count</button>
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/index'
const counter = useStore()

function addBtn() {
	//counter.count++
	counter.count++
	// 自动补全！ ✨
	//counter.$patch({ count: counter.count + 1 })
	// 或使用 action 代替
	//counter.increment()
}
</script>
@/store/index
