import Uploader from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoUploader = install(Uploader)

export type { UploaderInstance } from './src/instance'

export default YtoUploader
