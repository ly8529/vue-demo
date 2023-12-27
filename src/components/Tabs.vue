<script setup lang="ts">
import Home from './Home.vue'
import Posts from './Posts.vue'
import Archive from './Archive.vue'
import { ref } from 'vue'

const currentTab = ref('Home')

const tabs = {
	Home,
	Posts,
	Archive,
}
</script>

<template>
	<div class="demo">
		<button v-for="(_, tab) in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="currentTab = tab">
			{{ tab }}
			{{ _ }}
		</button>
		<component :is="tabs[currentTab]" class="tab"></component>
	</div>
</template>
