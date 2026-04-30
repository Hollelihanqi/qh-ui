import { withInstall } from '@hd-custom/utils'

import TableEditor from './src/table-editor.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdTableEditor: SFCWithInstall<typeof TableEditor> = withInstall(TableEditor)
export default HdTableEditor

export * from './src/table-editor'
export type { TableEditorInstance } from './src/instance'
