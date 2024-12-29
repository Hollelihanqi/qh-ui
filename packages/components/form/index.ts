import { withInstall, withNoopInstall } from '@yto-custom/utils'
import Form from './src/form.vue'
import FormItems from './src/form-items.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoForm: SFCWithInstall<typeof Form> & {
  FormItems: typeof FormItems
} = withInstall(Form, {
  FormItems,
})

export const YtoFormItems: SFCWithInstall<typeof FormItems> = withNoopInstall(FormItems)

export default YtoForm

export * from './src/form'

export type { FormInstance, FormItemsInstance } from './src/instance'
