import { version } from './version'
import type { App } from 'vue'

export const makeInstaller = (components: object) => {
  const install = (app: App) => {
    for (const [, component] of Object.entries(components)) {
      app.use(component)
    }
  }
  return {
    version,
    install,
  }
}
