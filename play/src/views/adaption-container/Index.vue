<template>
  <div class="view-w wrapper">
    <p>测试数据1</p>
    <yto-adaption-container :list="list" :min-num="3" min-width="230">
      <template #default="{ info }">
        <div class="card">{{ info }}</div>
      </template>
    </yto-adaption-container>
    <p>基于form的测试数据</p>
    <yto-adaption-container :list="list" :min-num="3" min-width="330">
      <template #default>
        <el-form-item class="" label="Activity name">
          <el-input placeholder="请输入啊啊啊" />
        </el-form-item>
      </template>
    </yto-adaption-container>
  </div>
</template>

<script lang="ts" setup>
import { addWaterMarker } from '@yto/utils'
const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
const formList = [
  {
    label: '活动名称',
    value: '1',
  },
  {
    label: '活动名称',
    value: '2',
  },
]
onMounted(() => {
  addWaterMarker({ text: '魏春霈 2024-1-25' })
  setTimeout(() => {
    addWaterMarker({ text: '魏春霈 2024-1-26 ' })
  }, 2000)
  setTimeout(() => {
    // removeWatermark();
  }, 4000)
})
</script>
<style lang="scss" scoped>
.wrapper {
  .card {
    @apply bg-[skyblue] h-[50px] flex justify-center items-center text-[16px];
  }
}
</style>
