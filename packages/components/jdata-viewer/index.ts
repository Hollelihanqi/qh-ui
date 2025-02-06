import { withInstall } from '@yto-custom/utils'

import JdataViewer from './src/jdata-viewer'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoJdataViewer: SFCWithInstall<typeof JdataViewer> = withInstall(JdataViewer)
export default YtoJdataViewer

export * from './src/ijdata-viewer'
export type { JdataViewerInstance } from './src/instance'