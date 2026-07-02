import { defineComponent, computed, isRef } from 'vue'
import { tabsProps, TabItemProps, tabsEmits } from './itabs'

export default defineComponent({
  name: 'Tabs',
  props: tabsProps,
  emits: tabsEmits,
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
      if (item.labelCount && isRef(item.labelCount)) {
        return <span class="tab-label-count">（{item.labelCount.value}）</span>
      } else if (typeof item.labelCount === 'function') {
        return <span class="tab-label-count">（{item.labelCount()}）</span>
      }
      return null
    }

    return () => {
      return (
        <div class="hd-tabs">
          <div class="ltabs-box">
            {props.tabs.map((item: TabItemProps, index: number) => {
              return (
                <>
                  <div
                    style={tabItemStyles}
                    class={`tab-item ${item.value === tabAct.value ? 'tab-active' : ''}`}
                    onClick={() => handleTabClick(item, index)}
                  >
                    <span> {item.label}</span>
                    {labelCountRender(item)}
                  </div>
                </>
              )
            })}
          </div>
          <div class="tabs-right-box">{slots.right && slots.right()}</div>
        </div>
      )
    }
  },
})
