<template>
  <div :class="`flex w-full ${direction === 'vertical' ? 'flex-wrap' : 'flex-col'}`">
    <slot name="prepend"></slot>
    <div :class="`flex ${direction === 'vertical' ? 'flex-col flex-1 w-0' : 'flex-wrap w-full'}`">
      <div v-for="(item, index) in modelValue" :key="index" class="flex items-center my-2" :style="`width: ${width}`">
        <div class="flex-1 w-0">
          <slot name="content" :item="item" :index="index"></slot>
        </div>
        <div>
          <slot v-if="$slots.operateBtn" name="btn" :item="item" :index="index"></slot>
          <template v-else>
            <el-button class="ml-2" link :icon="Plus" @click="onClick('add', index)"></el-button>
            <el-button
              v-show="modelValue.length > 1"
              class="mr-2"
              link
              :icon="Delete"
              @click="onClick('delete', index)"
            ></el-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Plus, Delete } from '@element-plus/icons-vue'
interface IAnyObject {
  [key: string]: any
}
interface IProps {
  direction?: 'vertical' | 'horizontal'
  modelValue: IAnyObject[]
  width?: string
}
withDefaults(defineProps<IProps>(), {
  direction: 'horizontal',
  width: '100%',
})
const emits = defineEmits(['add', 'delete'])
const onClick = (flag: 'add' | 'delete', index: number) => {
  if (flag === 'add') {
    emits('add', index)
  } else {
    emits('delete', index)
  }
}
</script>
