<template>
  <div class="view-w">
    <div class="wrapper w-[300px]">
      <yto-ellipsis-tag :tags="tags">
        <!-- <template #default="scope">
        <div class="h-[22px] bg-red-300">{{ scope.info }}</div>
      </template> -->
        <template #ellipsis>
          <span class="bg-red-300">123</span>
        </template>
      </yto-ellipsis-tag>
      <yto-ellipsis-tag :tags="tags">
        <!-- <template #default="scope">
        <div class="h-[22px] bg-red-300">{{ scope.info }}</div>
      </template> -->
      </yto-ellipsis-tag>
      <yto-ellipsis-tag :tags="tags">
        <!-- <template #default="scope">
        <div class="h-[22px] bg-red-300">{{ scope.info }}</div>
      </template> -->
      </yto-ellipsis-tag>
      <yto-ellipsis-tag :tags="tags">
        <!-- <template #default="scope">
        <div class="h-[22px] bg-red-300">{{ scope.info }}</div>
      </template> -->
      </yto-ellipsis-tag>
      <yto-ellipsis-tag :tags="tags">
        <!-- <template #default="scope">
        <div class="h-[22px] bg-red-300">{{ scope.info }}</div>
      </template> -->
      </yto-ellipsis-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
const list = ['sdfwe', 'fwewegwgw', 'rtyrtyrtyrt', 'h4h4h4h']
const tags = ref([
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
])
// setTimeout(() => {
//   tags.value.splice(1, 3);
// }, 3000);
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
