<template>
	<!-- ref -->
	<button @click="count++">
		{{ count }}
	</button>
	<br />
	<button @click="increment">increment: {{ count }}</button>
	<br />
	<!-- ref具有深层响应性 -->
	<button @click="mutateDeeply">mutateDeeply</button>
	<br />
	obj.value.nested.count: {{ obj.nested.count }}
	<br />
	obj.value.arr: {{ obj.arr }}
	<br />

	<!-- reactive 使对象本身具有响应性 -->
	<button @click="state.count++">
		{{ state.count }}
	</button>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const count = ref(0)
function increment() {
	// 在 JavaScript 中需要 .value
	count.value++
}

const obj = ref({
	nested: { count: 0 },
	arr: ['foo', 'bar'],
})

function mutateDeeply() {
	// 以下都会按照期望工作
	obj.value.nested.count++
	obj.value.arr.push('baz')
}

//1、一个 ref 会在作为响应式对象的属性被访问或修改时自动解包、只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包
const state = reactive({ count })
console.log(state.count) // 0
state.count = 1
console.log(count.value) // 1

//数组和集合的注意事项
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)

//在模板中解包的注意事项
const object = { id: ref(1) }
// {{ count + 1 }}
</script>
