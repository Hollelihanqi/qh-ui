import 'virtual:uno.css'
import { makeInstaller } from './make-installer'
import * as components from '@yto-custom/components'

export * from '@yto-custom/components'
export * from '@yto-custom/directives'
export * from '@yto-custom/hooks'

const installer = makeInstaller(components)

export const install = installer.install
export const version = installer.version

export default installer
