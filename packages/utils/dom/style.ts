import { isClient } from '../browser'
import { camelize } from '@vue/shared'

export const classNameToArray = (cls = '') =>
  cls.split(' ').filter((item) => !!item.trim())

export const getStyle = (element: HTMLElement, styleName: string): string => {
  if (!isClient || !element || !styleName) return ''
  let key = camelize(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = (element.style as any)[key]
    if (style) return style
    const computed = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch (e) {
    return (element.style as any)[key]
  }
}

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
  if (!el) return
  el.classList.remove(cls)
}

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}