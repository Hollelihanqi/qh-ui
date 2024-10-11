import type { ComponentPublicInstance } from 'vue'
import type { TextEllipsisProps } from './props'

export type TextEllipsisExpose = {
  toggle: (expanded?: boolean) => void
}

export type TextEllipsisInstance = ComponentPublicInstance<TextEllipsisProps, TextEllipsisExpose>

export type TextEllipsisThemeVars = {
  textEllipsisActionColor?: string
}
