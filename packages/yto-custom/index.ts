import installer from './defaults'

export * from '@yto-custom/components'
export * from '@yto-custom/directives'
export * from '@yto-custom/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version

export default installer
