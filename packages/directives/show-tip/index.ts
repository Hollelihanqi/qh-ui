/*
 * @Author: kfz
 * @Date: 2023-12-08 13:58:41
 * @LastEditors: kfz
 * @LastEditTime: 2024-01-26 10:28:23
 * @Description: 超过宽度才显示 ElTooltip, 配合ElTooltip使用，ElTooltip 父元素使用
 * @use <div v-show-tip> <ElTooltip /> </div>
 */
import type { Directive } from 'vue'
import { getStyle } from '@yto-custom/utils'

const showTip: Directive = {
  created(el: any, _: any, vnode: any) {
    const tooltipNode = vnode.children.find((childCmpt: any) => childCmpt.component?.type.name == 'ElTooltip')
    if (tooltipNode) {
      el.addEventListener('mouseenter', () => {
        tooltipNode.component.props.disabled = true
        const range = document.createRange()
        range.setStart(el, 0)
        range.setEnd(el, el.childNodes.length)
        const rangeWidth = Math.round(range.getBoundingClientRect().width)
        const padding =
          (parseInt(getStyle(el, 'paddingLeft'), 10) || 0) + (parseInt(getStyle(el, 'paddingRight'), 10) || 0)
        if (rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) {
          tooltipNode.component.props.disabled = false
        }
      })
    }
  },
}

export default showTip
