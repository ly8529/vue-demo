import { createApp } from 'vue'
import '@/assets/styles/reset.scss'
import '@/assets/styles/common.scss'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
