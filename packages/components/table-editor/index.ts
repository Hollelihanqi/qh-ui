import { withInstall } from '@yto-custom/utils'

import TableEditor from './src/table-editor.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoTableEditor: SFCWithInstall<typeof TableEditor> = withInstall(TableEditor)
export default YtoTableEditor

export * from './src/table-editor'
export type { TableEditorInstance } from './src/instance'
