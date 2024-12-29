import { defineComponent } from 'vue'
import { componentProps, componentEmits } from './component'
export default defineComponent({
  name: 'Component',
  props: componentProps,
  emits: componentEmits,
  setup(props, { emit, slots }) {
    return () => <div class="yto-component">组件内容</div>
  },
})
