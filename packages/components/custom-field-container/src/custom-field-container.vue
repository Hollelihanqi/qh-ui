<template>
  <div :class="`yto-custom-field-container flex w-full ${direction === 'vertical' ? 'flex-wrap' : 'flex-col'}`">
    <slot name="prepend"></slot>
    <div :class="`flex ${direction === 'vertical' ? 'flex-col flex-1 w-0' : 'flex-wrap w-full'}`">
      <div
        v-for="(item, index) in modelValue"
        :key="index + '_row'"
        class="flex items-center item-row"
        :style="`width: ${width}`"
      >
        <div class="flex-1 w-0">
          <slot name="content" :item="item" :index="index"></slot>
        </div>
        <div>
          <slot v-if="$slots.btn" name="btn" :item="item" :index="index"></slot>
          <template v-else>
            <el-button class="mx-2" link :icon="Plus" @click="onClick('add', index, item)"></el-button>
            <span class="mr-2 w-[20px] inline-block">
              <el-button
                v-show="termHiddenDel ? modelValue.length > 1 : true"
                link
                :icon="Delete"
                @click="onClick('delete', index, item)"
              ></el-button>
            </span>
            <slot name="btnAppend" :item="item" :index="index"></slot>
          </template>
        </div>
      </div>
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Plus, Delete } from '@element-plus/icons-vue'
import { customFieldContainerProps, customFieldContainerEmits } from './custom-field-container'

defineOptions({
  name: 'CustomFieldContainer',
})

defineProps(customFieldContainerProps)
const emits = defineEmits(customFieldContainerEmits)
const onClick = (flag: 'add' | 'delete', index: number, item: any) => {
  if (flag === 'add') {
    emits('add', index, item)
  } else {
    emits('delete', index, item)
  }
}
</script>
