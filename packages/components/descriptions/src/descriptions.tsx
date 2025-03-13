import { SetupContext, computed, defineComponent, Fragment } from 'vue'
import { descriptionsProps, DescriptionsProps, ListProps } from './idescriptions'
import { ElRow, ElCol } from 'element-plus'

export default defineComponent({
  name: 'Descriptions',
  props: descriptionsProps,
  setup(props: DescriptionsProps, { slots }: SetupContext) {
    // 计算列表项是否显示
    const isItemVisible = (item: ListProps) => {
      if (item.show === undefined) return true
      return typeof item.show === 'function' ? item.show() : item.show
    }

    // 计算标签宽度
    const labelWidth = computed(() => {
      if (props.labelPosition === 'top') return 'auto'
      if (props.border && props.labelWidth === 'auto') return '100px'
      return props.labelWidth
    })

    // 获取标签位置
    const getItemLabelPosition = (item: ListProps) => item.labelPosition || props.labelPosition

    // 计算列表项样式
    const getItemStyles = (item: ListProps) => ({
      display: 'flex',
      flexDirection: getItemLabelPosition(item) === 'top' ? 'column' : 'row',
    })

    // 计算标签样式
    const getLabelStyles = (item: ListProps) => {
      const itemLabelPosition = getItemLabelPosition(item)
      return {
        width: itemLabelPosition === 'top' ? 'auto' : labelWidth.value,
        textAlign: props.labelAlign,
        paddingRight: props.labelSuffixHide ? '12px' : '',
        fontWeight: 500,
        color: props.labelColor,
        ...(itemLabelPosition === 'top' ? { marginBottom: '8px' } : {}),
      }
    }

    // 计算值样式
    const getValueStyles = (item: ListProps) => ({
      color: props.valueColor,
      ...(getItemLabelPosition(item) === 'top' ? { width: '100%' } : {}),
    })

    // 渲染列表项内容
    const renderItemContent = (item: ListProps) => {
      if (!item.prop) return null

      if (item.render) return item.render(item)
      if (slots[item.prop]) return slots[item.prop]?.(item)

      const value = props.data[item.prop]
      const displayValue = item.enum ? item.enum[value] : value === undefined || value === null ? '--' : value

      return <div class="w-full flex flex-wrap break-all">{displayValue}</div>
    }

    // 判断是否显示标签
    const shouldShowLabel = (label?: string) => label !== undefined && label !== null && label.trim() !== ''

    // 渲染标签内容
    const renderLabel = (item: ListProps) => {
      if (slots[`label-${item.prop}`]) return slots[`label-${item.prop}`]?.(item)
      if (item.labelRender) return item.labelRender(item)
      return (
        <Fragment>
          {item.label}
          {!props.labelSuffixHide && !props.border && getItemLabelPosition(item) !== 'top' && '：'}
        </Fragment>
      )
    }

    return () => (
      <div class={`text-[14px] ${props.border ? 'descriptions-border' : ''}`}>
        {props.data ? (
          <ElRow gutter={!props.border ? 16 : 0} class="overflow-x-hidden" style={{ lineHeight: props.lineHeight }}>
            {props.list.map((item: ListProps) => {
              const itemLabelPosition = getItemLabelPosition(item)

              if (!isItemVisible(item)) return null

              return (
                <ElCol
                  style={getItemStyles(item)}
                  span={item.span || props.span}
                  class={['overflow-x-hidden', props.colAignItemsCenter ? 'items-center' : '']}
                >
                  {shouldShowLabel(item.label) && (
                    <div
                      class={{
                        'text-opc0': !item.label,
                        'desc-label': props.border,
                      }}
                      style={getLabelStyles(item)}
                    >
                      {renderLabel(item)}
                    </div>
                  )}
                  <div
                    class={`${itemLabelPosition === 'top' ? 'w-full' : 'flex-1 w-0'} desc-prop`}
                    style={getValueStyles(item)}
                  >
                    {renderItemContent(item)}
                  </div>
                </ElCol>
              )
            })}
          </ElRow>
        ) : (
          <div class="h-[100px] flex items-center justify-center">暂无数据</div>
        )}
      </div>
    )
  },
})
