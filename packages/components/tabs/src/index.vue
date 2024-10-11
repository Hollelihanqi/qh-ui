<script lang="tsx">
import { computed, defineComponent, isRef } from 'vue'
import { Props, TabItemProps } from './props'

export default defineComponent({
  name: 'Tabs',
  props: Props,
  emits: ['update:modelValue', 'update:activeIdx', 'change'],
  setup(props, { emit, slots }) {
    const tabAct = computed({
      get() {
        if (props.activeIdx === -1 && props.modelValue) {
          const _index = props.tabs.findIndex((e: TabItemProps) => e.value === props.modelValue)
          if (_index !== -1) emit('update:activeIdx', _index)
        }
        return props.modelValue !== undefined ? props.modelValue : props.tabs.length ? props.tabs[0]?.value : ''
      },
      set(value) {
        emit('update:modelValue', value)
      },
    })

    const handleTabClick = (item: TabItemProps, idx: number) => {
      tabAct.value = item.value
      emit('change', item)
      emit('update:activeIdx', idx)
    }

    const tabItemStyles = {
      padding: `0 ${props.w === 'auto' ? props.tabPx : 0}`,
      width: props.w,
    }

    const labelCountRender = (item: TabItemProps) => {
      if (isRef(item.labelCount)) {
        return <span class="pl-[2px]">（{item.labelCount.value}）</span>
      } else if (typeof item.labelCount === 'function') {
        return <span class="pl-[2px]">（{item.labelCount()}）</span>
      }
      return null
    }

    return () => {
      return (
        <div class="w-full flex h-[32px]">
          <div class="ltabs-box  flex">
            {props.tabs.map((item: TabItemProps, index: number) => {
              return (
                <>
                  <div
                    style={tabItemStyles}
                    class={`tab-item h-full flex items-center justify-center ${
                      item.value === tabAct.value ? 'tab-active' : ''
                    }`}
                    onClick={() => handleTabClick(item, index)}
                  >
                    <span> {item.label}</span>
                    {labelCountRender(item)}
                  </div>
                </>
              )
            })}
          </div>
          <div class="flex-1 w-0 h-full tabs-right-box">{slots.right && slots.right()}</div>
        </div>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
