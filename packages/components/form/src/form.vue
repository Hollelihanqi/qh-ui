<template>
  <ElForm ref="myForm" :model="form">
    <div v-if="layoutAuto" class="flex flex-wrap">
      <ElFormItem
        v-for="item in formConfig"
        v-bind="item?.formItemBinds"
        :key="item.prop"
        :label="item?.label"
        :prop="item?.prop"
        :label-width="item.labelWidth"
        class="mx-[10px]"
      >
        <div :class="item.contentClass">
          <BaseFormContent
            v-if="!$slots[item.prop]"
            :prop="item?.prop"
            :form="form"
            :item="item"
            :options="item?.options || itemConfig.options"
            :multiple="item?.multiple || false"
            :active-color="item?.activeColor || itemConfig.activeColor"
            :inactive-color="item?.inactiveColor || itemConfig.inactiveColor"
            :active-value="item?.activeValue || itemConfig.activeValue"
            :inactive-value="item?.inactiveValue || itemConfig.inactiveValue"
            :disabled="item?.disabled || itemConfig.disabled"
            :clearable="item?.clearable || itemConfig.clearable"
          />
          <slot v-if="$slots[item.prop]" :name="item?.prop" />
        </div>
      </ElFormItem>
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </div>

    <ElRow v-else class="dis-flex pad-tb-5">
      <ElCol
        v-for="(item, index) in formConfig"
        :key="index"
        class="pad-tb-5"
        :span="item.span || span"
        style="padding: 0 10px"
      >
        <ElFormItem :label="item?.label" :prop="item?.prop" :label-width="item.labelWidth" v-bind="item?.formItemBinds">
          <div :class="item.contentClass">
            <BaseFormContent
              :item="item"
              v-if="!$slots[item.prop]"
              :prop="item?.prop"
              :form="form"
              :options="item?.options || itemConfig.options"
              :multiple="item?.multiple || false"
              :active-color="item?.activeColor || itemConfig.activeColor"
              :inactive-color="item?.inactiveColor || itemConfig.inactiveColor"
              :active-value="item?.activeValue || itemConfig.activeValue"
              :inactive-value="item?.inactiveValue || itemConfig.inactiveValue"
              :disabled="item?.disabled || itemConfig.disabled"
              :clearable="item?.clearable || itemConfig.clearable"
            />
            <slot v-if="$slots[item.prop]" :name="item?.prop" />
          </div>
        </ElFormItem>
      </ElCol>
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </ElRow>
  </ElForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElForm, ElFormItem, ElRow, ElCol } from 'element-plus'
import BaseFormContent from '../../form-items/src/form-controls/Index.vue'
import { formProps } from './form'

defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Form',
})

defineProps(formProps)
const myForm = ref()
defineExpose({
  myForm,
})
</script>
