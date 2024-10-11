<template>
  <div :class="`custom-field-container flex w-full ${direction === 'vertical' ? 'flex-wrap' : 'flex-col'}`">
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
            <ElButton class="mx-2" link :icon="Plus" @click="onClick('add', index, item)"></ElButton>
            <span class="mr-2 w-[20px] inline-block">
              <ElButton
                v-show="termHiddenDel ? modelValue.length > 1 : true"
                link
                :icon="Delete"
                @click="onClick('delete', index, item)"
              ></ElButton>
            </span>
            <slot name="btnAppend" :item="item" :index="index"></slot>
          </template>
        </div>
      </div>
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="CustomFieldContainer">
import { ElButton } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'

export interface IAnyObject {
  [key: string]: any
}
interface IProps {
  direction?: 'vertical' | 'horizontal'
  modelValue: IAnyObject[]
  width?: string
  termHiddenDel?: boolean // 根据条件隐藏删除按钮
}
withDefaults(defineProps<IProps>(), {
  direction: 'horizontal',
  width: '100%',
  termHiddenDel: true,
})
const emits = defineEmits(['add', 'delete'])
const onClick = (flag: 'add' | 'delete', index: number, item: IAnyObject) => {
  if (flag === 'add') {
    emits('add', index, item)
  } else {
    emits('delete', index, item)
  }
}
</script>
<style lang="scss" scoped>
.custom-field-container {
  --field-row-m-y: 8px;
  .item-row {
    margin: var(--field-row-m-y) 0;
  }
}
</style>
