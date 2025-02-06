import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import YtoCustom from '@yto/custom'
import '@yto/custom/theme-chalk/index.css'
// import ElementPlus from 'element-plus'

const app = createApp(App)
// app.use(YtoCustom)
// app.use(ElementPlus)
app.mount('#app')
