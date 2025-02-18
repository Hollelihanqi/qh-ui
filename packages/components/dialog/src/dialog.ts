import type { ExtractPropTypes, PropType } from 'vue'
import { ButtonProps } from 'element-plus'

type MyParital<T> = {
  [P in keyof T]?: T[P]
}

type MyButtonProps = MyParital<ButtonProps> & {
  txt?: string
  hidden?: boolean | undefined
}

interface IConfirmOption {
  confirmCallback?: () => Promise<boolean>
}

interface ICancelOption {
  cancelCallback?: () => Promise<boolean>
}

export const dialogProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: Array as PropType<string[]>,
    default: () => ['auto', '20vh'],
  },
  hiddenFooter: {
    type: Boolean,
    default: false,
  },
  hiddenConfirm: {
    type: Boolean,
    default: false,
  },
  hiddenCancel: {
    type: Boolean,
    default: false,
  },
  confirmOption: {
    type: Object as PropType<MyButtonProps & IConfirmOption>,
    default: undefined,
  },
  cancelOption: {
    type: Object as PropType<MyButtonProps & ICancelOption>,
    default: undefined,
  },
}

export const dialogEmits = ['update:visible', 'cancel', 'confirm']

export type DialogProps = ExtractPropTypes<typeof dialogProps>
