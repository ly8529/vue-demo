import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore('store', {
	state: () => {
		return { count: 0 }
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	getters: {
		double: state => state.count * 2,
	},
	actions: {
		increment() {
			this.count++
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
