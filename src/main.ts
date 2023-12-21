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

import i18n, { $i18n } from '@/global/i18n'

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(allGlobalComponents)

app.config.globalProperties.$api = $api
app.config.globalProperties.$t = $i18n

app.use(router)
app.mount('#app')
