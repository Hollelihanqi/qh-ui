import { withInstall } from '@hd-custom/utils'

import DatePicker from './src/date-picker.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdDatePicker: SFCWithInstall<typeof DatePicker> = withInstall(DatePicker)
export default HdDatePicker

export * from './src/date-picker'
export type { DatePickerInstance } from './src/instance'
