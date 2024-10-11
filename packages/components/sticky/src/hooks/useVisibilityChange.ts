import { Ref, onDeactivated, onBeforeUnmount } from 'vue'
import { onMountedOrActivated } from './useEventListener'

export function useVisibilityChange(target: Ref<Element | undefined>, onChange: (visible: boolean) => void) {
  if (!(typeof window !== 'undefined') || !window.IntersectionObserver) return

  const observer = new IntersectionObserver(
    (entries) => {
      onChange(entries[0].intersectionRatio > 0)
    },
    { root: document.body },
  )

  const observe = () => {
    if (target.value) {
      observer.observe(target.value)
    }
  }

  const unobserve = () => {
    if (target.value) {
      observer.unobserve(target.value)
    }
  }

  onDeactivated(unobserve)
  onBeforeUnmount(unobserve)
  onMountedOrActivated(observe)
}
