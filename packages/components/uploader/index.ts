import { withInstall } from '@yto-custom/utils'
import Uploader from './src/uploader.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoUploader: SFCWithInstall<typeof Uploader> = withInstall(Uploader)
export default YtoUploader

export * from './src/uploader'