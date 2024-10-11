<script lang="tsx">
import { PropType, defineComponent, defineAsyncComponent, computed } from 'vue'
import { SearchFormControlProps, SelectOptionsProps } from '../interface'
import './style.scss'
import { YtoRemoteSearch } from '@yto-custom/components/remote-search'

const _elNameMap: any = {
  input: 'ElInput',
  select: 'ElSelect',
  'tree-select': 'ElTreeSelect',
  'date-picker': 'ElDatePicker',
  'time-picker': 'ElTimePicker',
  switch: 'ElSwitch',
  checkbox: 'ElCheckbox',
}

export default defineComponent({
  props: {
    control: {
      type: Object as PropType<SearchFormControlProps>,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: '',
    },
    cslot: {
      type: [Function],
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const _control = props.control
    const _el: any = props?.control?.el
    const _elName: any = _elNameMap[_el]
    const ElInputComponent = defineAsyncComponent(() => import('element-plus').then((module: any) => module[_elName]))
    const _ElOption = defineAsyncComponent(() => import('element-plus').then((module: any) => module['ElOption']))

    // 判断 placeholder
    const _placeholder = (control: SearchFormControlProps | undefined) => {
      return control?.props?.placeholder ?? (control?.el === 'input' ? '请输入' : '请选择')
    }
    // 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
    const _clearable = (control: SearchFormControlProps | undefined) => {
      return control?.props?.clearable ?? (control?.defaultValue == null || control?.defaultValue == undefined)
    }

    const _value = computed({
      get() {
        if (_elName === _elNameMap.select && _control?.props?.multiple && !Array.isArray(props.modelValue)) {
          return []
        }
        return typeof props.modelValue === 'string' ? props.modelValue?.trim() : props.modelValue
      },
      set(value) {
        ctx.emit('update:modelValue', typeof value === 'string' ? value?.trim() : value)
      },
    })

    const renderEl = () => {
      const renderElInputComponent = (children?: any) => (
        <ElInputComponent
          v-model={_value.value}
          placeholder={_placeholder(props?.control)}
          clearable={_clearable(props?.control)}
          {...props?.control?.props}
          class="msearch-form-item"
        >
          {children}
        </ElInputComponent>
      )

      const renderElOption = (options: SelectOptionsProps[]) => {
        return options.map((item) => <_ElOption label={item.label} value={item.value}></_ElOption>)
      }

      if (props.control.el === 'select') {
        if (props.control.options) {
          return renderElInputComponent(renderElOption(props.control.options))
        } else if (props.control.isRemote) {
          return selectRemoteRender()
        }
      } else {
        return renderElInputComponent()
      }
    }

    const controlRender = () => {
      return _control.render && _control.render(_value, _control)
    }

    const selectRemoteRender = () => {
      return _control.isRemote && <YtoRemoteSearch v-model={_value.value} {..._control.remoteProps} />
    }

    return () => {
      return (
        <>
          {_control?.render
            ? controlRender()
            : props.cslot
              ? props.cslot({ _value, control: _control })
              : _control?.el && renderEl()}
        </>
      )
    }
  },
})
</script>
