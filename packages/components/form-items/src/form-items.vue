<template>
  <template v-for="item in formConfig" :key="item.prop">
    <!-- 默认布局模式 -->
    <ElFormItem
      v-bind="item?.formItemBinds"
      :label="item?.label"
      :prop="item?.prop"
      :label-width="item.labelWidth"
      class="yto-form-item"
      :style="`width:${item.formItemWidth ?? itemConfig?.formItemWidth ?? '25%'}`"
    >
      <div :class="item.contentClass || 'w-full'">
        <BaseFormItem
          v-if="!$slots[item.prop]"
          v-bind="item"
          :item="item"
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
        <slot v-if="$slots[item.prop]" :name="item?.prop" :item="item" />
      </div>
    </ElFormItem>
  </template>
</template>

<script lang="ts" setup>
import { ElFormItem } from 'element-plus'
import { formItemsProps } from './form-items'
import BaseFormItem from './form-controls/Index.vue'

defineOptions({
  name: 'FormItems',
})
defineProps(formItemsProps)
</script>
