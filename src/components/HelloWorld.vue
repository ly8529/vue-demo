<template>
	<h1 class="filter-1">hello 小可爱！</h1>
	<router-link type="button" to="/login">去登录页面</router-link>
	<br />
	<router-link to="/account">去用户页面</router-link>
	<div>Current Count: {{ store.count }}</div>
	<button @click="addBtn">addBtn</button>

	<a-button type="primary" @click="addBtn">add count</a-button>
	<br />
	<a-button type="primary" @click="changeLang">changeLang</a-button>
	<h1 class="text-3xl font-bold underline">{{ $t('test') }} {{ i18n.global.locale }}</h1>
	<h1 class="text-3xl font-bold underline">{{ test }}</h1>
	<SvgIcon name="vue" color="pink" size="100"></SvgIcon>
	<SvgIcon name="bold" color="blue" size="100"></SvgIcon>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/stores/index'
import { Button as AButton } from 'ant-design-vue'
import $api from '@/service/request'
import i18n, { $i18n, setCurSystemLang } from '@/global/i18n'
import { SystemLang } from '@/global/enum'

$api.get('/test').then(res => {
	console.info('res:', res)
})
$api.test().then(res => {
	console.info('res:', res)
})
const store = useStore()

function addBtn() {
	store.count++

	// 自动补全！ ✨
	//store.$patch({ count: store.count + 1 })
	// 或使用 action 代替
	store.increment()
}

const test = computed(() => $i18n('test'))

function changeLang() {
	setCurSystemLang(SystemLang.EN)
}
</script>
<style lang="scss" scoped>
.filter-1 {
	filter: blur(1px);
}
</style>
