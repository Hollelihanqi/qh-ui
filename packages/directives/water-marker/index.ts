import type { DirectiveBinding } from 'vue'
import { addWaterMarker } from '@yto/utils'

const waterMarker = {
  mounted(el: DirectiveBinding, binding: DirectiveBinding) {
    addWaterMarker({ ...binding.value, elNode: el })
  },
}

export default waterMarker
