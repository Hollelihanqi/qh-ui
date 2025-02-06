<script lang="tsx">
import { ITableEditorAnyObject } from '../table-editor'
import { ElInput, ElSelect, ElTreeSelect, ElDatePicker, ElTimePicker, ElSwitch, ElTimeSelect } from 'element-plus'
import { defineComponent, PropType } from 'vue'

const _elNameMap: ITableEditorAnyObject = {
  input: ElInput,
  select: ElSelect,
  'tree-select': ElTreeSelect,
  'date-picker': ElDatePicker,
  'time-picker': ElTimePicker,
  'time-select': ElTimeSelect,
  switch: ElSwitch,
  checkbox: 'ElCheckbox',
  cascader: 'ElCascader',
  autocomplete: 'ElAutocomplete',
}

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<ITableEditorAnyObject>,
      required: true,
    },
  },
  setup(props) {
    const { itemType, placeholder } = props?.config || {}
    if (!itemType) return
    // const elName: any = _elNameMap[itemType]
    if (itemType) {
      const ElInputComponent = _elNameMap[itemType]
      const inPlaceholder = placeholder || props.config.type === 'input' ? '请输入' : '请选择'
      const itemConfig = {
        options: props?.config?.options,
      }
      const inConfig = props?.config.itemProps || {}
      return () => (
        <ElInputComponent clearable {...itemConfig} {...inConfig} placeholder={inPlaceholder}></ElInputComponent>
      )
    } else {
      console.error('table-edit组件类型不存在')
    }
  },
})
</script>
