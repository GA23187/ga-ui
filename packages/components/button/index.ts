import { App, Plugin } from 'vue'
import Button from './src/index.vue'

export const GaButton: Plugin = {
  install(app: App) {
    app.component('ga-button', Button)
  },
}
