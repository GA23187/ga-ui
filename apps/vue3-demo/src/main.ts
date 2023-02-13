import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入组件库
import GaUi from 'ga-ui'
// 引入组件库css
import 'ga-ui/styles/button.scss'

createApp(App).use(GaUi).mount('#app')
