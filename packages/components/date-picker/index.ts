import { withInstall } from '@yto-custom/utils'
import DatePicker from './src/date-picker.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoDatePicker: SFCWithInstall<typeof DatePicker> = withInstall(DatePicker)
export default YtoDatePicker

export * from './src/date-picker'