<template>
  <div class="flex">
    <div
      v-for="(op, idx) in props.options"
      :key="idx"
      class="flex py-[6px] cursor-pointer items-center select-none mr-[32px] last:(mr-0)"
      @click="onClicked(op)"
    >
      <div
        :class="`${
          isCheck === (typeof op === 'string' ? op : op[props.value]) ? `active-icon` : ''
        } w-[14px] h-[14px] border rounded-full mr-[8px] flex items-center justify-center ${
          disabled ? 'disabled-radio' : ''
        }`"
      >
        <div
          v-show="isCheck === (typeof op === 'string' ? op : op[props.value])"
          class="w-[4px] h-[4px] rounded-full border-full shadow bg-white"
        ></div>
      </div>
      <div
        :class="{
          'active-text': isCheck === (typeof op === 'string' ? op : op[props.value]),
          'disabled-text': disabled,
        }"
      >
        {{ typeof op === 'string' ? op : op[props.label] }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Radio">
import { computed } from 'vue'
export interface IOptions {
  label: string
  value: any
  [key: string]: any
}
export interface IProps {
  options?: string[] | IOptions[]
  modelValue: string[] | any
  label?: string
  value?: string
  cancel?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => [],
  modelValue: () => [],
  value: 'value',
  label: 'label',
  cancel: true,
  disabled: false,
})
const emit = defineEmits(['update:modelValue', 'change'])
const isCheck = computed({
  set: (val) => {
    emit('update:modelValue', val)
  },
  get: () => props.modelValue,
})
const onClicked = (op: string | IOptions) => {
  if (props.disabled) return
  const _key = typeof op === 'string' ? op : op[props.value]
  if (isCheck.value === _key) {
    if (!props.cancel) return
    isCheck.value = ''
  } else {
    isCheck.value = _key
  }
  emit('change', isCheck.value, typeof op === 'string' ? '' : op[props.value])
}
</script>
<style lang="scss" scoped>
.active-icon {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
}
.active-text {
  color: var(--el-color-primary);
}
.disabled-text {
  cursor: not-allowed;
  color: var(--el-disabled-text-color);
}
.disabled-radio {
  cursor: not-allowed;
  border-color: var(--el-disabled-border-color);
  background-color: var(--el-disabled-bg-color);
}
</style>
