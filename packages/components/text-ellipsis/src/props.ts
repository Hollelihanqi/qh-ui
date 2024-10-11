import { type ExtractPropTypes } from 'vue'
import { makeNumericProp, makeStringProp } from './utils'
export const Props = {
  rows: makeNumericProp(1),
  dots: makeStringProp('...'),
  content: makeStringProp(''),
  expandText: makeStringProp(''),
  collapseText: makeStringProp(''),
  position: makeStringProp('end'),
}

export type TextEllipsisProps = ExtractPropTypes<typeof Props>
