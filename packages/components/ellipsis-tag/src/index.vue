<template>
  <div :id="containerId" ref="ellipsisTagRef" v-resize-element="resizeHandle" class="ellipsis-tag flex w-full">
    <div class="flex-1 overflow-hidden">
      <div class="tag-box">
        <template v-for="(tag, index) in tags" :key="tag[valueKey] || index">
          <slot :info="tag">
            <p class="tag" :style="tag.style">
              {{ tag.label }}
            </p>
          </slot>
        </template>
      </div>
    </div>
    <ElPopover popper-class="ellipsis-tag-popover" placement="top-end" :width="360" trigger="hover" v-bind="$attrs">
      <template #default>
        <ul class="tag-box">
          <template v-for="(tag, index) in tags" :key="tag[valueKey] || index">
            <slot :info="tag">
              <p class="tag" :style="tag.style">
                {{ tag[labelKey] }}
              </p>
            </slot>
          </template>
        </ul>
      </template>
      <template #reference>
        <slot name="ellipsis">
          <div v-show="shoEllipsis" class="ellipsis">
            <ElIcon color="#7f7f7f">
              <MoreFilled />
            </ElIcon>
          </div>
        </slot>
      </template>
    </ElPopover>
  </div>
</template>

<script lang="ts" setup name="EllipsisTag">
import { ElIcon, ElPopover } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'
import { ResizeElement as vResizeElement } from '@yto-custom/directives'
import { guid, debounceFun } from '@yto/utils'
import { logger } from '@yto-custom/utils'

interface Props {
  tags?: Array<any>
  valueKey?: string
  labelKey?: string
}
const props = withDefaults(defineProps<Props>(), {
  valueKey: 'value',
  labelKey: 'label',
  tags: () => {
    return []
  },
})
const containerId = computed(() => {
  return `ellipsis-tag_${guid()}`
})
const ellipsisTagRef = ref()
const shoEllipsis = ref(false)
const resizeHandle = debounceFun((info: any) => {
  handleResize(info)
}, 300)
const handleResize = (info: any) => {
  const boxEl = unref(ellipsisTagRef).querySelector(`#${unref(containerId)} .tag-box`)
  logger('ellipsis-tag-handleResize', boxEl, unref(containerId))
  if (!boxEl) return
  const boxWidth = boxEl.getBoundingClientRect().width
  shoEllipsis.value = info.width < boxWidth
}
watch(
  () => props.tags,
  () => {
    const tmpEl: any = document.querySelector(`#${unref(containerId)} .tag-box`)
    if (!tmpEl) return
    resizeHandle({ width: tmpEl.offsetWidth })
  },
  {
    deep: true,
  },
)
onMounted(() => {
  const tmpEl: any = document.querySelector(`#${unref(containerId)} .tag-box`)
  if (!tmpEl) return
  resizeHandle({ width: tmpEl.offsetWidth })
})
</script>
<style lang="scss" scoped>
.ellipsis-tag {
  .tag-box {
    white-space: nowrap;
    width: fit-content;
  }

  .ellipsis {
    @apply rounded-[2px] px-[8px] bg-white flex items-center;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
}
</style>
<style lang="scss">
.ellipsis-tag,
.ellipsis-tag-popover {
  .tag {
    @apply rounded-[2px] inline-block mr-[8px] px-[8px] py-[4px];
    border: 1px solid rgba(0, 0, 0, 0.15);
    word-break: keep-all;
  }
}

.el-popover.ellipsis-tag-popover {
  @apply px-[8px] pt-[8px] pb-0;

  .tag {
    @apply mb-[8px];
  }
}
</style>
