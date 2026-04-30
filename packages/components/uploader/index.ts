import { withInstall } from '@hd-custom/utils'

import Uploader from './src/uploader.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdUploader: SFCWithInstall<typeof Uploader> = withInstall(Uploader)
export default HdUploader

export * from './src/uploader'
export type { UploaderInstance } from './src/instance'
