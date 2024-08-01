import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18nInstance } from './i18n'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// i18n örneğini oluştur ve kullan
const i18n = createI18nInstance()
app.use(i18n)

app.mount('#app')