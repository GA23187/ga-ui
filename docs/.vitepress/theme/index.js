import DefaultTheme from 'vitepress/theme'
// ga-ui引入
import Gaui from 'ga-ui'
import 'ga-ui/styles/button.scss'

// 插件的组件，主要是demo组件
// import './styles/index.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Gaui)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  },
}
