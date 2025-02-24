<template>
  <ElForm v-bind="$attrs" ref="myForm" :model="form">
    <div v-if="layoutAuto" class="flex flex-wrap">
      <FormItems :formConfig="formConfig" :layoutAuto="layoutAuto" :size="size" :form="form" :itemConfig="itemConfig">
        <template v-for="slotName in slotNames" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope"></slot>
        </template>
      </FormItems>
    </div>

    <ElRow v-else class="dis-flex pad-tb-5">
      <ElCol
        v-for="(item, index) in formConfig"
        :key="index"
        class="pad-tb-5"
        :span="item.span || span"
        style="padding: 0 10px"
      >
        <FormItem :item="item" :form="form" :itemConfig="itemConfig" />
      </ElCol>
      <SlotDefault v-if="$slots.default" />
    </ElRow>
  </ElForm>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import {} from 'element-plus'
import FormItems from '@yto-custom/components/form-items'
import { formProps, formEmits } from './form'

defineOptions({
  name: 'Form',
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const slotNames = computed(() => Object.keys(useSlots()) as string[])
</script>
