import { SetupContext, computed, defineComponent } from 'vue'
import { descriptionsProps, DescriptionsProps, ListProps } from './idescriptions'
import { ElRow, ElCol } from 'element-plus'

export default defineComponent({
  name: 'Descriptions',
  props: descriptionsProps,
  setup(props: DescriptionsProps, { slots }: SetupContext) {
    // 获取每列实际的 labelPosition
    const getItemLabelPosition = (item: ListProps) => {
      // 优先使用列自身的 labelPosition
      if (item.labelPosition) return item.labelPosition
      // 其次使用全局配置
      return props.labelPosition
    }

    // 根据每列的 labelPosition 计算样式
    const getItemStyles = (item: ListProps) => ({
      display: 'flex',
      flexDirection: getItemLabelPosition(item) === 'top' ? 'column' : 'row',
    })

    const _show = (item: ListProps) => {
      if (item.show !== undefined && typeof item.show !== 'function') {
        return item.show
      } else if (typeof item.show === 'function') {
        return item.show()
      }
      return true
    }

    const _lwidth = computed(() => {
      if (props.labelPosition === 'top') return 'auto'
      if (props.border && props.labelWidth === 'auto') {
        return '100px'
      }
      return props.labelWidth
    })

    // 判断是否显示 label
    const shouldShowLabel = (label?: string) => {
      return label !== undefined && label !== null && label.trim() !== ''
    }

    return () => {
      return (
        <div class={`text-[14px] ${props.border ? 'descriptions-border' : ''}`}>
          {props.data ? (
            <ElRow gutter={!props.border ? 16 : 0} class="overflow-x-hidden" style={{ lineHeight: props.lineHeight }}>
              {props.list.map((item: any) => {
                const itemLabelPosition = getItemLabelPosition(item)
                const classes = {
                  'text-opc0': !item.label,
                  'desc-label': props.border,
                }
                const labelStyles: any = {
                  width: itemLabelPosition === 'top' ? 'auto' : _lwidth.value,
                  'text-align': props.labelAlign,
                  'padding-right': props.labelSuffixHide ? '12px' : '',
                  color: props.labelColor,
                  ...(itemLabelPosition === 'top'
                    ? {
                        marginBottom: '8px',
                      }
                    : {}),
                }
                const valueStyles: any = {
                  color: props.valueColor,
                  ...(itemLabelPosition === 'top'
                    ? {
                        width: '100%',
                      }
                    : {}),
                }
                return (
                  _show(item) && (
                    <ElCol style={getItemStyles(item)} span={item.span || props.span} class="overflow-x-hidden">
                      {shouldShowLabel(item.label) && (
                        <span class={classes} style={labelStyles}>
                          {item.label}
                          {!props.labelSuffixHide && !props.border && itemLabelPosition !== 'top' && '：'}
                        </span>
                      )}
                      <div
                        class={`${itemLabelPosition === 'top' ? 'w-full' : 'flex-1 w-0'} desc-prop`}
                        style={valueStyles}
                      >
                        {item.prop && !item.render && !slots[item.prop] && (
                          <div class="w-full flex flex-wrap break-all">
                            {item.enum
                              ? item.enum[props.data[item.prop]]
                              : props.data[item.prop] === undefined || props.data[item.prop] === null
                                ? '--'
                                : props.data[item.prop]}
                          </div>
                        )}
                        {item.render && item.render(item)}
                        {item.prop && !item.render && slots[item.prop] && slots?.[item.prop]?.(item)}
                      </div>
                    </ElCol>
                  )
                )
              })}
            </ElRow>
          ) : (
            <div class="h-[100px] flex items-center justify-center">暂无数据</div>
          )}
        </div>
      )
    }
  },
})
