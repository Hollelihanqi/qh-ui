/*
 * @Author: weichunpei
 * @Date: 2023-12-08 13:58:41
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-01-12 10:28:23
 * @Description: 元素大小变化监听指令 handle:Function
 * @use <div v-resize-element="handle"> </div></div>
 */

import { Directive } from 'vue'
const map = new WeakMap()
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handle = map.get(entry.target)
    if (handle) {
      const box = entry.borderBoxSize[0]
      if (box.inlineSize === 0 && box.blockSize === 0) return
      handle({
        width: box.inlineSize,
        height: box.blockSize,
      })
    }
  }
})

const resizeElement: Directive = {
  mounted: function (el, binding) {
    ob.observe(el)
    map.set(el, binding.value)
  },
  unmounted(el) {
    ob.unobserve(el)
  },
}

export default resizeElement
