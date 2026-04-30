<template>
  <div ref="containerRef" v-resize-element="resizeHandle" class="hd-ellipsis-tag ellipsis-tag flex w-full">
    <div class="flex-1 overflow-hidden">
      <div class="tag-box" ref="tagBoxRef">
        <template v-for="(tag, index) in tags">
          <slot :info="tag">
            <p class="tag" :style="tag.style" :key="tag[valueKey] || index">
              {{ tag[labelKey] }}
            </p>
          </slot>
        </template>
      </div>
    </div>
    <ElPopover popper-class="ellipsis-tag-popover" placement="top-end" :width="360" trigger="hover" v-bind="$attrs">
      <template #default>
        <div class="tag-box">
          <template v-for="(tag, index) in tags">
            <slot :info="tag">
              <p class="tag" :style="tag.style" :key="tag[valueKey] || index">
                {{ tag[labelKey] }}
              </p>
            </slot>
          </template>
        </div>
      </template>
      <template #reference>
        <slot name="ellipsis">
          <div v-show="shoEllipsis" class="ellipsis">
            <ElIcon>
              <MoreFilled />
            </ElIcon>
          </div>
        </slot>
      </template>
    </ElPopover>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { ElIcon, ElPopover } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'
import { ellipsisTagProps, ResizeInfo } from './ellipsis-tag'
import { debounceFun } from '@hd-custom/share'
import { ResizeElement as vResizeElement } from '@hd-custom/directives'

defineOptions({
  name: 'EllipsisTag', // 组件名称 大驼�?
})

const props = defineProps(ellipsisTagProps)

const containerRef = ref<HTMLElement | null>(null)
const tagBoxRef = ref<HTMLElement | null>(null)
const shoEllipsis = ref(false)

const resizeHandle = debounceFun((info: ResizeInfo) => {
  handleResize(info)
}, 300)

const handleResize = (info: { width: number }) => {
  if (!tagBoxRef.value) return
  const boxWidth = tagBoxRef.value.getBoundingClientRect().width
  shoEllipsis.value = info.width < boxWidth
}

// 使用nextTick确保DOM更新
watch(
  () => props.tags,
  () => {
    nextTick(() => {
      if (!tagBoxRef.value) return
      resizeHandle({
        width: tagBoxRef.value.offsetWidth,
        height: tagBoxRef.value.offsetHeight,
      })
    })
  },
  { deep: true },
)
</script>
