<template>
  <div class="hd-radio">
    <div v-for="(op, idx) in props.options" :key="idx" class="radio-item" @click="onClicked(op)">
      <div
        :class="`radio-icon ${
          isCheck === (typeof op === 'string' ? op : op[props.value]) ? `active-icon` : ''
        } ${disabled ? 'disabled-radio' : ''}`"
      >
        <div v-show="isCheck === (typeof op === 'string' ? op : op[props.value])" class="radio-dot"></div>
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
