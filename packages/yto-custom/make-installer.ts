import { version } from './version'
import type { App, Plugin } from 'vue'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    console.log(components)
    for (const [, component] of Object.entries(components)) {
      app.use(component)
    }
  }

  return {
    version,
    install,
  }
}
