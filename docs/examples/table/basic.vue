<template>
  <hd-table :columns="columns" :table-data="tableData" :total="total" :table-change="handleTableChange" :border="false">
    <template #callStatus="scope">
      <span>{{ scope.row.status }}</span>
    </template>
  </hd-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const total = 60
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
})

// 分页选择
const handleTableChange = async (type: string, num: number) => {
  type === 'page' && (paginationParams.value.pageNum = num)
  if (type === 'size') {
    //页码重置
    paginationParams.value.pageNum = 1
    paginationParams.value.pageSize = num
  }
}

const tableData = [
  {
    name: 'User 001',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '示例目标 001',
  },
  {
    name: 'User 002',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '示例目标 002',
  },
  {
    name: 'User 003',
    age: '26岁',
    sex: '女',
    isWife: '已婚',
    dream: '示例目标 003',
  },
  {
    name: 'User 004',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '示例目标 004',
  },
  {
    name: 'User 005',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '示例目标 005',
  },
]

// 列配置
const columns = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '性别',
    prop: 'sex',
  },
  {
    label: '是否已婚',
    prop: 'isWife',
  },
  {
    label: '梦想',
    prop: 'dream',
  },
]
</script>
