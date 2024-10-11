<template>
  <div
    ref="editDiv"
    class="custom-edit-div"
    :class="{ 'red-b': !valid, 'focus-border': isFocus && valid, 'event-none': disabled }"
    @click="handleEditDClick"
  >
    <ElTag
      v-for="(item, index) in tags"
      :key="index"
      :type="item.valid ? 'primary' : 'danger'"
      :closable="!disabled"
      @close="handleTagClose(index)"
    >
      {{ item.text }}
    </ElTag>
    <ElInput
      v-if="tags.length"
      ref="editInput"
      v-model="inputText"
      type="textarea"
      :autosize="_autosize"
      :disabled="disabled"
      @blur="handleWBlur"
      @focus="handleWFocus"
    ></ElInput>
    <ElInput
      v-else
      ref="editInput"
      v-model="inputText"
      type="textarea"
      :autosize="_autosize"
      :disabled="disabled"
      :placeholder="placeholder"
      @blur="handleWBlur"
      @focus="handleWFocus"
    ></ElInput>
  </div>
</template>
<script lang="ts" setup name="TareaTag">
import { ElTag, ElInput } from 'element-plus'
import { List } from 'immutable'
import { Props } from './props'
import { logger } from '@yto-custom/utils'

const props = defineProps(Props)
const emits = defineEmits(['update:modelValue', 'on-updated'])
const editDiv = ref()
const editInput = ref()
const valid = ref(true)
const isFocus = ref(false)
const inputText = ref('')
const _autosize = computed(() => {
  return tags.value.length ? { minRows: 1 } : { minRows: 2 }
})

const tags: any = computed({
  get() {
    const list = checkText(typeof props.modelValue === 'string' ? [props.modelValue] : props.modelValue)
    return list
  },
  set(value) {
    const _v = value.map((item: any) => item)
    emits('update:modelValue', _v.length ? _v.filter((item: string) => item) : '')
    emits('on-updated', _v)
  },
})

const handleEditDClick = () => {
  editInput.value.focus()
  isFocus.value = true
}

const handleTagClose = (idx: number) => {
  let _tags = List(tags.value).toJS()
  _tags.splice(idx, 1)
  tags.value = _tags.map((item: any) => item.text)
  setTimeout(() => {
    valided(tags.value)
  }, 0)
}

const handleWBlur = () => {
  isFocus.value = false
  if (inputText.value || tags.value.length) {
    const formattedText = formatInputText()
    const oldValue = typeof props.modelValue === 'string' ? [props.modelValue] : props.modelValue
    tags.value = [...oldValue, ...formattedText.split(',')]
  } else if (props.required && !inputText.value) {
    valid.value = false
  } else {
    valid.value = true
  }
  setTimeout(() => {
    valided(tags.value)
  }, 0)
}

const handleWFocus = () => {
  isFocus.value = true
  valid.value = true
}

const formatInputText = () => {
  return inputText.value.replace(/[\n\r\s,，]+/g, ',')
}

const checkText = (value: any) => {
  inputText.value = ''
  // 用于验证文本项的函数
  const validateItem = (item: string) => {
    logger('validateItem', item)
    if (!item) return null
    const isValid =
      props.regular instanceof RegExp
        ? props.regular.test(item)
        : typeof props.regular === 'function'
          ? props.regular(item)
          : true
    return {
      text: item,
      valid: isValid,
    }
  }

  // 使用 map 来创建一个新数组，并过滤掉所有 null 值
  const newTags = value.map(validateItem).filter(Boolean)
  return [...newTags]
}

const valided = (values: []) => {
  if (props.required && !values.length) {
    valid.value = false
    return
  }
  valid.value = values.every((item: any) => item.valid)
}

const validState = () => {
  return valid.value
}

defineExpose({ validState })
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
