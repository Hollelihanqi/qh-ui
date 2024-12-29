<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2024-02-21 13:29:30
 * @LastEditTime: 2024-03-20 13:25:13
-->
<template>
  <div class="p-10">
    <yto-c-time-line :timeData="timeData">
      <template #dot>
        <div class="triangle"></div>
      </template>
      <template #default="{ item }">
        <div class="mb-4">
          <el-descriptions :title="`${item.title}  -  ${item.timestamp}`">
            <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
            <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
            <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
            <el-descriptions-item label="Remarks">
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Address"
              >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</el-descriptions-item
            >
          </el-descriptions>
        </div>
      </template>
    </yto-c-time-line>
  </div>
</template>
<script setup lang="ts">
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
