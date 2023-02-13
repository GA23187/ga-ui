import { App, Plugin } from 'vue'
import Tag from './src/index.vue'

export const GaTag: Plugin = {
  install(app: App) {
    app.component('ga-tag', Tag)
  },
}
