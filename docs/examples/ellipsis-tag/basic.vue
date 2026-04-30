<template>
  <div class="wrapper w-[330px] p-[16px]">
    <hd-ellipsis-tag :tags="tags"></hd-ellipsis-tag>
  </div>
</template>

<script lang="ts" setup>
const tags = [
  {
    value: 1,
    label: '高风险',
    style: 'color: #FE4D50;background: rgba(254,77,80,0.1);border-color: rgba(254,77,80,0.15)',
  },
  {
    value: 1,
    label: '敏感查询',
  },
  {
    value: 2,
    label: '未认领',
    style: 'color: #FAAD18;background: rgba(250,173,24,0.1);border-color: rgba(250,173,24,0.15)',
  },
  {
    value: 3,
    label: '一条自定义标签',
  },
  {
    value: 4,
    label: '恶意软件',
  },
  {
    value: 5,
    label: '木马病毒',
  },
]
</script>
<style lang="scss" scoped>
.wrapper {
  :deep(.tag-box) {
    .tag {
      @apply m-0 mr-[10px];
    }
  }
}
</style>
