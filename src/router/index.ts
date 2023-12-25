import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('@/components/Base.vue') },
	{ path: '/reactive', component: () => import('@/components/Reactive.vue') },
	{ path: '/login', component: () => import('@/pages/login.vue') },
	{ path: '/account', component: () => import('@/pages/account.vue') },
	// { path: '/:pathMatch(.*)', redirect: '/'  },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((_to, _from, next) => {
	next()
})

export default router
