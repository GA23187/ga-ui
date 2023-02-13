import { GaButton } from '@ga23187/components/button'
import { GaTag } from '@ga23187/components/tag'
import Components from './components'
import { App } from 'vue'

const Installer = {
  install(app: App) {
    Components.forEach((c) => {
      app.use(c)
    })
  },
}

export default Installer
export { GaButton, GaTag }
