<template>
  <ElDialog ref="dialogRef" class="dialog-cst" v-bind="$attrs" :style="{ marginLeft: offset[0], marginTop: offset[1] }">
    <template #header>
      <slot name="header"></slot>
    </template>

    <slot />

    <template #footer v-if="!_hiddenFooter">
      <slot name="footer">
        <ElButton v-if="_showCancel" v-bind="_cancelOption" @click="handleClose">{{
          _cancelOption.txt ? _cancelOption.txt : '取消'
        }}</ElButton>
        <ElButton v-if="_showConfirm" v-bind="_confirmOption" @click="handleConfirm">{{
          _confirmOption.txt ? _confirmOption.txt : '确认'
        }}</ElButton>
      </slot>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup name="Dialog">
import { ButtonProps, ElButton, ElDialog } from 'element-plus'
import { ref } from 'vue'
import { logger } from '@yto-custom/utils'

const dialogRef = ref()

type MyParital<T> = {
  [P in keyof T]?: T[P]
}

type MyButtonProps = MyParital<ButtonProps> & {
  txt?: string
  hidden?: boolean | undefined
}

export interface IConfirmOption {
  confirmCallback?: () => Promise<boolean>
}
export interface ICancelOption {
  cancelCallback?: () => Promise<boolean>
}

export interface IProps {
  visible: boolean
  offset?: Array<string>
  hiddenFooter?: boolean | undefined
  hiddenConfirm?: boolean | undefined
  hiddenCancel?: boolean | undefined
  confirmOption?: (MyButtonProps & IConfirmOption) | undefined
  cancelOption?: (MyButtonProps & ICancelOption) | undefined
}
const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  offset: () => {
    return ['auto', '20vh']
  },
})
const $emit = defineEmits(['update:visible', 'cancel', 'confirm'])

// -------------------------------- footer btn start--------------------------
const _confirmOption = computed(() => {
  let option: MyButtonProps = {
    type: 'primary',
    size: 'default',
    txt: '确认',
    hidden: false,
  }
  option = Object.assign({}, option, props.confirmOption)
  return reactive(option)
})
const _cancelOption = computed(() => {
  let option: MyButtonProps = {
    type: 'default',
    size: 'default',
    txt: '取消',
    hidden: false,
  }
  option = Object.assign({}, option, props.cancelOption)
  return reactive(option)
})

const _hiddenFooter = computed(() => {
  if (Reflect.has(props, 'hiddenFooter') && typeof props.hiddenFooter == 'boolean') return props.hiddenFooter
  return Reflect.has(props, 'hiddenFooter')
})
const _hiddenConfirm = computed(() => {
  if (Reflect.has(props, 'hiddenConfirm') && typeof props.hiddenConfirm == 'boolean') return props.hiddenConfirm
  return Reflect.has(props, 'hiddenConfirm')
})
const _hiddenCancel = computed(() => {
  if (Reflect.has(props, 'hiddenCancel') && typeof props.hiddenCancel == 'boolean') return props.hiddenCancel
  return Reflect.has(props, 'hiddenCancel')
})

const _showConfirm = computed(() => {
  if (_hiddenConfirm.value) return false
  const { confirmOption } = props
  if (!confirmOption) return true
  if (Reflect.has(confirmOption, 'hidden') && typeof confirmOption.hidden == 'boolean') return !confirmOption.hidden
  return !Reflect.has(confirmOption!, 'hidden')
})
const _showCancel = computed(() => {
  if (_hiddenCancel.value) return false
  const { cancelOption } = props
  logger('cancelOption', cancelOption)
  if (!cancelOption) return true
  if (Reflect.has(cancelOption, 'hidden') && typeof cancelOption.hidden == 'boolean') return !cancelOption.hidden
  return !Reflect.has(cancelOption!, 'hidden')
})

const handleClose = () => {
  props.cancelOption?.cancelCallback?.().then((val: boolean) => {
    logger('handleClose', val)
  })
  dialogRef.value.visible = false
  $emit('update:visible', false)
  $emit('cancel', 'cancel')
}
const handleConfirm = () => {
  props.confirmOption?.confirmCallback?.().then((val: boolean) => {
    logger('handleConfirm', val)
    if (val) {
      dialogRef.value.visible = false
    }
  })
  $emit('update:visible', false)
  $emit('confirm', 'confirm')
}
// -------------------------------- footer btn end--------------------------
</script>
