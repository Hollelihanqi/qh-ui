import installer from './defaults'

export * from '@hd-custom/components'
export * from '@hd-custom/directives'
export * from '@hd-custom/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version

export default installer
