import type { Directive } from 'vue'
import { getStyle } from 'element-plus/es/utils/dom/index'

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
