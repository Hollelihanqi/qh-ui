import { ref, watch, computed, reactive, defineComponent, type PropType, type CSSProperties, Ref } from 'vue'

import { useScrollParent, useRect, useEventListener, useVisibilityChange } from './hooks/index'
import './index.scss'

export const numericProp = [Number, String]
export type StickyPosition = 'top' | 'bottom'
export const makeStringProp = <T,>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal,
})
export const makeNumericProp = <T,>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal,
})
export const makeBooleanProp = <T,>(defaultVal: T) => ({
  type: Boolean as unknown as PropType<T>,
  default: defaultVal,
})

export function getZIndexStyle(zIndex?: number | string) {
  const style: CSSProperties = {}
  if (zIndex !== undefined) {
    style.zIndex = +zIndex
  }
  return style
}
export function getScrollTop(el: Element | Window | null): number {
  if (!el) return 0
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset
  return Math.max(top, 0)
}
export function isHidden(elementRef: HTMLElement | Ref<HTMLElement | undefined>) {
  const el = unref(elementRef)
  if (!el) return false
  const style = window.getComputedStyle(el)
  const hidden = style.display === 'none'
  const parentHidden = el.offsetParent === null && style.position !== 'fixed'
  return hidden || parentHidden
}
export const unitToNumber = (value: string | number): number => {
  if (typeof value === 'number') return value
  if (value.includes('px')) {
    parseFloat(value.replace('px', ''))
  }
  return parseFloat(value)
}

export const stickyProps = {
  zIndex: numericProp,
  position: makeStringProp<StickyPosition>('top'),
  container: Object as PropType<Element>,
  offsetTop: makeNumericProp(0),
  offsetBottom: makeNumericProp(0),
  inGlobal: makeBooleanProp(true),
}

export default defineComponent({
  name: 'Sticky',
  props: stickyProps,
  emits: ['scroll', 'change'],
  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>()
    const sticySelf = ref<HTMLElement>()
    const scrollParent = useScrollParent(root)
    const { inGlobal } = props

    const scrollParentRect = ref({
      width: 0,
      height: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    })

    const state = reactive({
      fixed: false,
      width: 0,
      height: 0,
      transform: 0,
      left: 0,
    })
    const offset = computed(() => unitToNumber(props.position === 'top' ? props.offsetTop : props.offsetBottom))

    const rootStyle = computed<CSSProperties | undefined>(() => {
      const { fixed, height, width } = state
      if (fixed) {
        return {
          width: `${width}px`,
          height: `${height}px`,
        }
      }
      return undefined
    })

    const stickyStyle = computed<CSSProperties | undefined>(() => {
      if (!state.fixed) {
        return
      }
      const { clientHeight } = document.documentElement

      let positionY = 0
      if (props.position === 'bottom') {
        positionY = clientHeight - scrollParentRect.value.bottom + offset.value
      } else {
        positionY = scrollParentRect.value.top + offset.value
      }

      const style: CSSProperties = Object.assign(getZIndexStyle(props.zIndex), {
        width: `${state.width}px`,
        height: `${state.height}px`,
        [props.position]: inGlobal ? `${offset.value}px` : `${positionY}px`,
        left: `${state.left}px`,
      })

      if (state.transform) {
        style.transform = `translate3d(0, ${state.transform}px, 0)`
      }

      return style
    })

    const emitScroll = (scrollTop: number) => emit('scroll', { scrollTop, isFixed: state.fixed })

    const onScroll = () => {
      if (!root.value || isHidden(root)) return

      const { container, position } = props
      const rootRect = useRect(root)
      const scrollTop = getScrollTop(scrollParent.value as Element)

      state.width = rootRect.width
      state.height = rootRect.height

      if (position === 'top') {
        // 吸顶
        if (container) {
          // 获取容器的{ x, y, width, height }
          const containerRect = useRect(container)
          const { top: scrollParentTop } = scrollParentRect.value
          // 备注：container 在滚动元素中不可见时，取消吸顶; 【容器的 bottom - 滚动父级的top < 0 说明容器在滚动元素中不可见了】
          const differenceY = containerRect.bottom - scrollParentTop
          state.fixed = differenceY > 0 && containerRect.bottom > 0 && offset.value <= scrollParentTop - rootRect.top
          // state.transform = difference < 0 ? difference : 0;
        } else {
          // 没有指定容器的时候，在当前父级滚动parent中吸顶
          const { top: scrollParentTop } = scrollParentRect.value
          state.fixed = offset.value <= scrollParentTop - rootRect.top
        }
      } else {
        // 吸底
        if (container) {
          // 获取容器的{ x, y, width, height }
          const containerRect = useRect(container)
          const { bottom: scrollParentBottom } = scrollParentRect.value
          // 备注：container 在滚动元素中不可见时，取消吸底部; 【容器top - 滚动父级的bottom > 0 说明容器在滚动父级不可见】===【容器的bottom - 滚动父级的bottom < 容器的高度 说明容器在滚动父级可见】
          const differenceY = containerRect.top - scrollParentBottom
          state.fixed = differenceY > 0 && scrollParentBottom - offset.value < rootRect.bottom // root 是否在滚动父级中可见:

          // const difference = clientHeight - containerRect.top - offset.value - state.height;
          // state.fixed = clientHeight - offset.value < rootRect.bottom && clientHeight > containerRect.top;
          // state.transform = difference < 0 ? -difference : 0;
        } else {
          const { bottom: scrollParentBottom } = scrollParentRect.value
          state.fixed = scrollParentBottom - offset.value < rootRect.bottom
        }
      }
      emitScroll(scrollTop)
    }

    watch(
      () => state.fixed,
      (val: boolean) => emit('change', val),
    )

    useEventListener('scroll', onScroll, {
      target: scrollParent,
      passive: true,
    })
    useVisibilityChange(root, onScroll)

    onMounted(() => {
      state.left = useRect(sticySelf).left
      scrollParentRect.value = useRect(scrollParent)
    })

    return () => (
      <div ref={root} style={rootStyle.value} class={{ 'c-sticky-root': true }}>
        <div ref={sticySelf} class={{ 'c-sticky': true, 'c-sticky--fixed': state.fixed }} style={stickyStyle.value}>
          {slots.default?.()}
        </div>
      </div>
    )
  },
})
