/**
 * @description
 * 给目标元素添加事件
 */

import { onUnmounted, onDeactivated, onMounted, onActivated, watch, isRef, Ref } from 'vue'

export type TargetRef = EventTarget | Ref<EventTarget | undefined>
export type UseEventListenerOptions = {
  target?: TargetRef
  capture?: boolean
  passive?: boolean
}
export function useEventListener(type: string, listener: EventListener, options: UseEventListenerOptions = {}) {
  if (!(typeof window !== 'undefined')) return

  const { target = window, passive = false, capture = false } = options

  let attached: boolean // 是否已经给目标元素绑定了事件

  const add = (target?: TargetRef) => {
    const element = unref(target)
    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive,
      })
      attached = true
    }
  }

  const remove = (target?: TargetRef) => {
    const element = unref(target)
    if (element && attached) {
      element.removeEventListener(type, listener, capture)
      attached = false
    }
  }

  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target))
  onMountedOrActivated(() => add(target))

  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      remove(oldVal)
      add(val)
    })
  }
}

export function onMountedOrActivated(hook: () => any) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
