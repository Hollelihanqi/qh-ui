import { withInstall } from '@hd-custom/utils'

import JdataViewer from './src/jdata-viewer'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdJdataViewer: SFCWithInstall<typeof JdataViewer> = withInstall(JdataViewer)
export default HdJdataViewer

export * from './src/ijdata-viewer'
export type { JdataViewerInstance } from './src/instance'
