<template>
  <div class="p-10">
    <yto-time-line :timeData="timeData">
      <template #dot>
        <div class="triangle"></div>
      </template>
      <template #default="{ item }">
        <div class="mb-4">
          <ElDescriptions :title="`${item.title}  -  ${item.timestamp}`">
            <ElDescriptionsItem label="Username">kooriookami</ElDescriptionsItem>
            <ElDescriptionsItem label="Telephone">18100000000</ElDescriptionsItem>
            <ElDescriptionsItem label="Place">Suzhou</ElDescriptionsItem>
            <ElDescriptionsItem label="Remarks">
              <ElTag size="small">School</ElTag>
            </ElDescriptionsItem>
            <ElDescriptionsItem label="Address">
              No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
              </ElDescriptionsItem>
          </ElDescriptions>
        </div>
      </template>
    </yto-time-line>
  </div>
</template>
<script setup lang="ts">
import { ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus'
const timeData = [
  {
    title: '需求发起',
    timestamp: '2018-04-15',
  },
  {
    title: '进行中',
    timestamp: '2018-04-13',
  },
  {
    title: '已完成',
    timestamp: '2018-04-11',
  },
]
</script>
<style lang="scss" scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid green; /* 这里的颜色可自定义 */
}
</style>
