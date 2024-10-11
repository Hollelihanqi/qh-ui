<script lang="tsx">
import { computed, defineComponent, SetupContext } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import { Props, DescriptionsProps, ListProps } from './props'

export default defineComponent({
  name: 'Descriptions',
  props: Props,
  setup(props: DescriptionsProps, { slots }: SetupContext) {
    const styles = {
      display: 'flex',
    }
    const _show = (item: ListProps) => {
      if (item.show !== undefined && typeof item.show !== 'function') {
        return item.show
      } else if (typeof item.show === 'function') {
        return item.show()
      }
      return true
    }
    const _lwidth = computed(() => {
      if (props.border && props.labelWidth === 'auto') {
        return '100px'
      }
      return props.labelWidth
    })

    return () => {
      return (
        <div class={`text-[14px] ${props.border ? 'descriptions-border' : ''}`}>
          {props.data ? (
            <ElRow gutter={!props.border ? 16 : 0} class="overflow-x-hidden" style={{ lineHeight: props.lineHeight }}>
              {props.list.map((item: any) => {
                const classes = {
                  'text-opc0': !item.label,
                  'desc-label': props.border,
                }
                const labelStyles: any = {
                  width: _lwidth.value,
                  'text-align': props.labelAlign,
                  'padding-right': props.labelSuffixHide ? '12px' : '',
                  color: props.labelColor,
                }
                const valueStyles: any = {
                  color: props.valueColor,
                }
                return (
                  _show(item) && (
                    <ElCol style={styles} span={item.span || props.span} class="overflow-x-hidden">
                      <span class={classes} style={labelStyles}>
                        {item.label ? item.label : '--'}
                        {!props.labelSuffixHide && !props.border && '：'}
                      </span>
                      <div class="flex-1 w-0 desc-prop" style={valueStyles}>
                        {item.prop && !item.render && !slots[item.prop] && (
                          <div class="w-full flex flex-wrap break-all">
                            {item.enum ? item.enum[props.data[item.prop]] : props.data[item.prop] || '--'}
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
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
