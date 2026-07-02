import { defineComponent, ref } from 'vue'
import { stickyContainerProps, stickyContainerEmits } from './isticky-container'
import { ElScrollbar } from 'element-plus'
export default defineComponent({
  name: 'StickyContainer',
  props: stickyContainerProps,
  emits: stickyContainerEmits,
  setup(props, { slots, attrs, expose }) {
    const scrollbarRef = ref()
    expose({
      getScrollbarInstance: () => scrollbarRef.value,
      scrollToBottom: () => {
        const scrollbar = scrollbarRef.value?.wrapRef
        if (scrollbar) {
          scrollbar.scrollTop = scrollbar.scrollHeight
        }
      },
    })
    return () => (
      <div class="hd-sticky-container staicky-w">
        {slots.header && <div class="staicky-h"> {slots.header()}</div>}
        <div class="staicky-c">
          <ElScrollbar ref={scrollbarRef} height="100%" {...attrs}>
            {slots.default && slots.default()} {slots.footer && <div class="staicky-f">{slots.footer()}</div>}
          </ElScrollbar>
        </div>
      </div>
    )
  },
})
