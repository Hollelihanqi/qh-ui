<script lang="tsx">
import { defineComponent, resolveComponent, h, SetupContext, DefineComponent } from 'vue'
import { ElInput, ElSelectV2, ElFormItem } from 'element-plus'
import { Props, IAnyObject } from './props'

export default defineComponent({
  name: 'CustomFieldConfig',
  components: {
    ElInput,
    ElSelectV2,
  },
  props: Props,
  emits: ['cbChange', 'update:modelValue'],
  setup(props: any, { slots, emit }: SetupContext) {
    const nameConfig: IAnyObject = { fieldConfig: 'field', operatorConfig: 'operator', valueConfig: 'value' }
    const itemRender = (key: string) => {
      const _itemConfig = props[key]
      const slotsFun = nameConfig[key] ? slots[nameConfig[key]] : null
      if (slotsFun) {
        return slotsFun()
      } else if (_itemConfig.elType) {
        const tmpProps = { ..._itemConfig }
        // delete tmpProps.props //props字段与selectV2冲突
        Reflect.deleteProperty(tmpProps, 'props')
        // const ElComponent = resolveComponent('el-' + _itemConfig.elType)
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
      <div>
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
</script>
<style lang="scss" scoped>
:deep(.custom-field-config-row) {
  .el-select-v2__wrapper,
  .el-input__inner,
  .el-input__wrapper.is-focus,
  .el-select__wrapper,
  .el-input__wrapper {
    box-shadow: none !important;
    border: none !important;
  }
  .el-select {
    --el-select-input-focus-border-color: transparent;
  }
  // :has(> .is-error) {
  //   border: 1px solid #f00;
  // }
}
:deep(.el-form-item) {
  margin-bottom: 0px !important;
}
:deep(.is-error) {
  .custom-field-config-row {
    border: 1px solid #f00;
  }
}
.is-error {
  & {
    border-color: red !important;
  }
}
:deep(.value-view) {
  .el-input__inner {
    text-align: right;
  }
}
</style>
