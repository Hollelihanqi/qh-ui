<template>
  <div class="yto-radio flex">
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
<script lang="ts" setup>
import { computed } from 'vue'
import { radioProps, radioEmits, RadioOptionProp } from './radio'

defineOptions({
  name: 'Radio',
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const isCheck = computed({
  set: (val) => {
    emit('update:modelValue', val)
  },
  get: () => props.modelValue,
})
const onClicked = (op: string | RadioOptionProp) => {
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
