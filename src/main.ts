import { createApp } from 'vue'
import '@/assets/styles/reset.scss'
import '@/assets/styles/common.scss'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import $api from '@/service/requestList'

import 'virtual:svg-icons-register'
import allGlobalComponents from '@/global/allGlobalComponents'

const app = createApp(App)

app.config.globalProperties.$api = $api

app.use(router)
app.use(createPinia())
app.use(allGlobalComponents)
app.mount('#app')
