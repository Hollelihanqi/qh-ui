import { defineComponent, resolveComponent, h, SetupContext, DefineComponent } from 'vue'
import { ElInput, ElSelectV2, ElFormItem } from 'element-plus'
import { customFieldConfigProps, customFieldConfigEmits } from './icustom-field-config'

export default defineComponent({
  name: 'CustomFieldConfig',
  components: {
    ElInput,
    ElSelectV2,
  },
  props: customFieldConfigProps,
  emits: customFieldConfigEmits,
  setup(props: any, { slots, emit }: SetupContext) {
    const nameConfig: any = { fieldConfig: 'field', operatorConfig: 'operator', valueConfig: 'value' }
    const itemRender = (key: string) => {
      const _itemConfig = props[key]
      const slotsFun = nameConfig[key] ? slots[nameConfig[key]] : null
      if (slotsFun) {
        return slotsFun()
      } else if (_itemConfig.elType) {
        const tmpProps = { ..._itemConfig }
        delete tmpProps.props //props字段与selectV2冲突
        return h(resolveComponent('el-' + _itemConfig.elType), {
          modelValue: props.modelValue[_itemConfig.props],
          'onUpdate:modelValue': (val: any) => {
            props.modelValue[_itemConfig.props] = val
            emit('cbChange', _itemConfig.props, val)
          },
          class: `${key === 'operatorConfig' ? '' : 'flex-1'} ${nameConfig[key]}-view`,
          style: 'width:' + (key === 'operatorConfig' ? props.optionWidth || '100px' : 'auto'),
          disabled: props.disabled || _itemConfig.disabled || false,
          ...tmpProps,
        })
      }
      return null
    }
    const rowRender = () => {
      const _domConfigs = ['fieldConfig', 'operatorConfig', 'valueConfig']
      return (
        <div class="custom-field-config-row w-full flex items-center border">
          {_domConfigs.map((e) => itemRender(e))}
        </div>
      )
    }
    return () => (
      <div class="yto-custom-field-config">
        {props.rules ? (
          <ElFormItem prop={props.ruleProp || ''} rules={props.rules(props.modelValue)}>
            {rowRender()}
          </ElFormItem>
        ) : (
          rowRender()
        )}
      </div>
    )
  },
}) as DefineComponent
