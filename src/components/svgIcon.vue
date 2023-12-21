<template>
	<svg aria-hidden="true" :width="width" :height="height">
		<use :href="symbolId" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: '#333',
	},
	size: {
		type: String,
		default: '',
	},
})
const symbolId = computed(() => `#icon-${props.name}`)

const size = props.size.split(' ')

let width: string
let height: string
if (size.length === 1) {
	;[width] = size
	height = width
} else if (size.length === 2) {
	;[width, height] = size
} else {
	throw new Error(`invalid size for svg: ${props.name}`)
}
</script>
