import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'
import { makeNumericProp, makeStringProp } from './utils'
import type TextEllipsis from './text-ellipsis'

export const textEllipsisProps = buildProps({
  rows: makeNumericProp(1),
  dots: makeStringProp('...'),
  content: makeStringProp(''),
  expandText: makeStringProp(''),
  collapseText: makeStringProp(''),
  position: makeStringProp('end'),
})

export const textEllipsisEmits = ['clickAction']

export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>

export type TextEllipsisInstance = InstanceType<typeof TextEllipsis>