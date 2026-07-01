import { createApp } from 'vue'

import 'virtual:uno.css'
import './style.css'
import App from './App.vue'

import './assets/styles/index.scss'

// import HdCustom from '@rdeam/hd-ui'
// import '@rdeam/hd-ui/theme-chalk/index.css'
// import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import router from './router'

const app = createApp(App)
// app.use(ElementPlus)
// app.use(HdCustom)
app.use(router)
app.mount('#app')
