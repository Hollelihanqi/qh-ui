import { createApp } from 'vue'

import 'element-plus/theme-chalk/index.css'

import 'virtual:uno.css'
import './style.css'
import App from './App.vue'

import './assets/styles/index.scss'

// import YtoCustom from '@yto/custom'
// import '@yto/custom/theme-chalk/index.css'
// import ElementPlus from 'element-plus'

import router from './router'

const app = createApp(App)
// app.use(ElementPlus)
// app.use(YtoCustom)
app.use(router)
app.mount('#app')
