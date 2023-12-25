<template>
	<!-- 文本插值 -->
	<span>Message: {{ msg }}</span>
	<!-- 插入 HTML -->
	<p>Using text interpolation: {{ rawHtml }}</p>
	<p>
		Using v-html directive:
		<span v-html="rawHtml"></span>
	</p>
	<!-- Attribute 如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除。 -->
	<div :id="dynamicId">dynamicId: {{ dynamicId }}</div>
	<!-- 动态绑定多个值 -->
	<div v-bind="objectOfAttrs"></div>
	<!-- js表达式 -->
	{{ number + 1 }}

	{{ ok ? 'YES' : 'NO' }}

	{{ message.split('').reverse().join('') }}

	<div :id="`list-${id}`">{{ `list-${id}` }}</div>
	<!-- 调用函数 绑定在表达式中的方法在组件每次更新时都会被重新调用 -->
	<time :title="toTitleDate(date)" :datetime="date">
		{{ formatDate(date) }}
	</time>
	<!-- 指令 Directives -->
	<!-- 1、参数 -->
	<p v-if="ok">1、参数</p>
	<!-- 2、事件 -->
	<a @click="doSomething">2、事件</a>
	<!-- 3、动态参数 -->
	<a @[eventName]="doSomething">3、动态参数</a>
	<!-- 修饰符 -->
	<form @submit.prevent="doSomething">
		<input type="submit" value="button" />
	</form>
</template>
<script lang="ts" setup>
const msg = 'text'
const rawHtml = `<span style="color:red">This should be red.</span>`
const dynamicId = '123'
const objectOfAttrs = {
	id: 'container',
	class: 'wrapper',
}
const number = 1
const ok = true
const message = '你好啊'
const id = 111

const date = new Date().toLocaleDateString()
function toTitleDate(time: string) {
	return time
}
function formatDate(time: string) {
	return time
}
const eventName = 'click'
function doSomething() {
	alert(message)
}
</script>
